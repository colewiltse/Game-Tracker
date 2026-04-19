import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../api';
import ErrorAlert from '../../components/ErrorAlert';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';


const GameDetail = () => {
    const [game, setGame] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const apiUrl = `/games/${id}/`
        setLoading(true);

        fetchWithAuth(apiUrl,{})
            .then(response => response.json())
            .then(data => setGame(data))
            
            .catch(error => {
            console.error(error);
            setError("Error fetching game data.");
            })
            .finally(() =>{
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    
        if (!confirmDelete) return;

        fetchWithAuth(`/games/${id}/`, {method: "DELETE",})
            .then(navigate('/game_list'))

            .catch(error => {
            console.error(error);
            setError("Error deleting game.");
            });
    };

    if(loading){
        return(
            <LoadingSpinner loading={loading}/>
        )
    }

    return (
        <Container>
            <ErrorAlert error={error}/>
            <Row xs={1} md={2} className="mx-auto d-flex align-items-top g-4 mt-2 mb-1 mx-5">
                <Col>
                    <img src={game.box_art !== null ? `${game.box_art}` : "/no_game_image.jpg"} alt="Game Art" className="img-fluid card" />
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='mb-3'>{game.title}</Card.Title>
                            <Card.Text>Console: {game.console_display}</Card.Text>

                            <Card.Text>Release Year: {game.release_year} </Card.Text>

                            <Card.Text>Genre: {game.genre_display} </Card.Text>

                            <Card.Text>Description: {game.description} </Card.Text>

                            <div className="d-flex gap-2 mt-3">
                                <Link to={`/game_update/${id}`}>
                                    <Button variant="primary">Edit</Button>
                                </Link>

                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div> 
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GameDetail;

