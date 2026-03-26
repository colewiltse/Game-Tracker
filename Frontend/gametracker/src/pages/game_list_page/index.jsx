import GameCard from '../../components/GameCard';
import React, { useEffect, useState } from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const GameList = ({isLoggedIn}) => {
    const [games, setGames] = useState([]);
    const [currPage, setCurrPage] = useState('http://localhost:8000/games/');
    const [filterValues, setFilterValues] = useState({
        console: '',
        search: '',
        ordering: '',
    });
    // const gameListUrl = 'http://localhost:8000/games/';
    const accessToken = localStorage.getItem('access');

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentQueryParams = new URLSearchParams(filterValues);
        const newUrl = `http://localhost:8000/games/?${currentQueryParams.toString()}`;
        setCurrPage(newUrl);
    };

    const handleFilterChange = (filter, value) => {
        setFilterValues((prevValues) => ({
            ...prevValues,
            [filter]: value,
        }));
    };


    useEffect(() => {        
        fetch(currPage, {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGames(data);
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, [currPage]); 


    return(
        <Container>
            <Form onSubmit={handleSubmit}>            
                <Row className='g-3 mb-3 align-items-center justify-content-center'>
                    <Col className='auto'>
                        <Form.Label className='col-form-label'>
                            Console
                        </Form.Label>
                    </Col>

                    <Col className='auto'>
                        <Form.Select value={filterValues.console} onChange={(event) => handleFilterChange('console', event.target.value)}>
                            <option value="">All</option>
                            <option value="ps5">PS5</option>
                            <option value="nes">NES</option>
                            <option value="other">Other</option>
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
                <Row xs={1} sm={2} md={4} lg={8} className="mb-4">
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