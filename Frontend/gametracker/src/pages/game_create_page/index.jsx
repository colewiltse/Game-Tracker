import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE from '../../base_url';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardText from 'react-bootstrap/esm/CardText';
import { fetchWithAuth } from '../../api';
import ErrorAlert from '../../components/ErrorAlert';


const GameCreate = () => {
    const navigate = useNavigate();
    const createGameUrl = '/games/';

    const [consoles, setConsoles] = useState([]);
    const [genres, setGenres] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        console: '',
        release_year: '',
        genre: '',
        description: '',
        box_art: null,
    });
    const [error, setError] = useState("");

    useEffect(() => {
            fetch(`${API_BASE}/consoles/`)
                .then(response => response.json())
                .then(data => setConsoles(data))
                .catch(err => console.error(err));
        }, []);

    useEffect(() => {
            fetch(`${API_BASE}/genres/`)
                .then(response => response.json())
                .then(data => setGenres(data))
                .catch(err => console.error(err));
        }, []);

  const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      box_art: e.target.files[0],
    });
  };

    function handleSubmit(event) {
        let data = new FormData(event.target);

        fetchWithAuth(createGameUrl, {
            method: "POST",
            body: data,
        })
        .then(request => request.json())
        .then(json => {
            if ('id' in json) {
                navigate(`/games/${json.id}`);
            }
            else {
                setError("Unknown error. Please try again later.")
            }
        })
        .catch(error => {
            console.error(error);
            setError("Unable to connect to server. Please try again later.");
        });

        event.preventDefault();


    }

    return (
        <Container>
            <ErrorAlert error={error}/>
            <Form onSubmit={handleSubmit}>
            <Row xs={1} md={2} className="mx-auto d-flex align-items-top g-4 mt-2 mb-1 mx-5">
                <Col>
                    <img src={formData.box_art
                    ? URL.createObjectURL(formData.box_art)
                    : "/no_game_image.jpg"} alt="Game Art" className="img-fluid card" />
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control
                                    name='title'
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    type="text"
                                    required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Console
                                </Form.Label>
                                <Form.Select 
                                    name='console' 
                                    value={formData.console} 
                                    onChange={handleChange}>
                                    {consoles.map(console => (
                                        <option key={console.value} value={console.value}>
                                        {console.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Release Year
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    name="release_year"
                                    value={formData.release_year}
                                    onChange={handleChange}
                                    min="1950"
                                    max={new Date().getFullYear()}
                                />
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>
                                    Genre
                                </Form.Label>
                                <Form.Select 
                                    name='genre' 
                                    value={formData.genre} 
                                    onChange={handleChange}>
                                    {genres.map(genre => (
                                        <option key={genre.value} value={genre.value}>
                                        {genre.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control 
                                    name='description' 
                                    value={formData.description} 
                                    onChange={handleChange} 
                                    type="text"
                                    required/>
                            </Form.Group>



                            <Form.Group className="mt-3">
                                <Form.Label>Box Art</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="box_art"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>

                            <Button type="submit" className="btn btn-primary mt-3">
                                Submit
                            </Button>
                              
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </Form>
        </Container>
    );
};

export default GameCreate;

