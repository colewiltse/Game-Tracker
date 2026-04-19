import GameCard from '../../components/GameCard';
import React, { useEffect, useState } from 'react';
import API_BASE from '../../base_url';
import ErrorAlert from '../../components/ErrorAlert';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchWithAuth } from '../../api';
import LoadingSpinner from '../../components/LoadingSpinner';



const GameList = () => {
    const [games, setGames] = useState([]);
    const [currPage, setCurrPage] = useState('/games/');
    const [consoles, setConsoles] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filterValues, setFilterValues] = useState({
        console: '',
        search: '',
        ordering: '',
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentQueryParams = new URLSearchParams(filterValues);
        const newUrl = `/games/?${currentQueryParams.toString()}`;
        setCurrPage(newUrl);
    };

    const handleFilterChange = (filter, value) => {
        setFilterValues((prevValues) => ({
            ...prevValues,
            [filter]: value,
        }));
    };

    useEffect(() => {
        fetch(`${API_BASE}/consoles/`)
            .then(response => response.json())
            .then(data => setConsoles(data))
            .catch(error => {
            console.error(error);
            setError("Error fetching consoles.");
            });
    }, []);

    useEffect(() => {
        fetch(`${API_BASE}/genres/`)
            .then(response => response.json())
            .then(data => setGenres(data))
            .catch(error => {
            console.error(error);
            setError("Error fetching genres.");
            });
    }, []);


    useEffect(() => {
        setLoading(true);        
        fetchWithAuth(currPage, {})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGames(data);
            })
            .catch(error => {
            console.error(error);
            setError("Error fetching games.");
            })
            .finally(() => {
                setLoading(false);
            })
    }, [currPage]); 


    return(
        <Container>
            <LoadingSpinner loading={loading}/>
            <ErrorAlert error={error}/>
            <Form onSubmit={handleSubmit}>            
                <Row className='g-3 mb-3 mt-1 align-items-center justify-content-center'>
                    <Col className='auto'>
                        <Form.Label className='col-form-label'>
                            Console
                        </Form.Label>
                    </Col>

                    <Col className='auto'>
                        <Form.Select value={filterValues.console} onChange={(event) => handleFilterChange('console', event.target.value)}>
                            <option value="">All</option>
                            {consoles.map(console => (
                                <option key={console.value} value={console.value}>
                                {console.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col className='auto'>
                        <Form.Label className='col-form-label'>
                            Genre
                        </Form.Label>
                    </Col>

                    <Col className='auto'>
                        <Form.Select value={filterValues.genre} onChange={(event) => handleFilterChange('genre', event.target.value)}>
                            <option value="">None</option>
                            {genres.map(genre => (
                                <option key={genre.value} value={genre.value}>
                                {genre.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>

                    <Col className='auto'>
                        <Form.Label className='col-form-label'>
                            Keyword
                        </Form.Label>
                    </Col>

                    <Col className='auto'>
                        <Form.Control value={filterValues.search} onChange={(event) => handleFilterChange('search', event.target.value)} type="text"/>
                    </Col>

                    <Col className='auto'>
                        <Form.Label className='col-form-label'>
                            Sort Order
                        </Form.Label>
                    </Col>

                    <Col className='auto'>
                        <Form.Select value={filterValues.ordering} onChange={(event) => handleFilterChange('ordering', event.target.value)}>
                            <option value="-created">Most Recent First</option>
                            <option value="created">Least Recent First</option>
                            <option value="title">Title A-Z</option>
                            <option value="-title">Title Z-A</option>
                            <option value="release_year">Release Year</option>
                        </Form.Select>
                    </Col>

                    <Col className='auto'>
                        <Button type="submit" className="btn btn-primary">
                            Submit
                        </Button>
                    </Col>

                </Row>
            </Form>

            <Container className="py-1">
                <Row xs={1} sm={2} md={4} lg={8} className="mb-4 g-3">
                    { games.map(game => (
                        <Col>
                            <GameCard game={game} />
                        </Col>
                    )) }
                </Row>
            </Container>

        </Container>
    );

};

export default GameList;