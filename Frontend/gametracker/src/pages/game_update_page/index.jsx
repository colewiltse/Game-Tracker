import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CardText from 'react-bootstrap/esm/CardText';
import { fetchWithAuth } from '../../api';


const GameUpdate = ({isLoggedIn}) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');
    const updateGameUrl = `/games/${id}/`;

    const [consoles, setConsoles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        console: '',
        description: '',
        box_art: null,
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = `http://localhost:8000/games/${id}/`

        fetch(apiUrl,
            {headers: {
            "Authorization": `Bearer ${accessToken}`,
            },}
        )
            .then(response => response.json())
            .then(data => setFormData(data))
            .then(setLoading(false))
            
            .catch(error => {
                console.error('Error fetching game data:', error);
            });
    }, [id, accessToken]);



    useEffect(() => {
            fetch("http://localhost:8000/consoles/")
                .then(response => response.json())
                .then(data => setConsoles(data))
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
        event.preventDefault();

        const data = new FormData();

        data.append("title", formData.title);
        data.append("console", formData.console);
        data.append("description", formData.description);

        if (formData.box_art instanceof File) {
            data.append("box_art", formData.box_art);
        }

        fetchWithAuth(updateGameUrl, {
            method: "PATCH",
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <Row xs={1} md={2} className="mx-auto d-flex align-items-top g-4 mt-2 mb-1 mx-5">
                <Col>
                    <img src={ formData.box_art instanceof File
                    ? URL.createObjectURL(formData.box_art)
                    : formData.box_art || "/no_game_image.jpg"} alt="Game Art" className="img-fluid card" />
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Form.Group>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control name='title' value={formData.title} onChange={handleChange} type="text"/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Console
                                </Form.Label>
                                <Form.Select name='console' value={formData.console} onChange={handleChange}>
                                    {consoles.map(console => (
                                        <option key={console.value} value={console.value}>
                                        {console.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control name='description' value={formData.description} onChange={handleChange} type="text"/>
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

                            <Button type="submit" className="btn btn-primary">
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

export default GameUpdate;

