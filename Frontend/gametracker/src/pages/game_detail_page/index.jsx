import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import CardText from 'react-bootstrap/esm/CardText';


const GameDetail = ({isLoggedIn}) => {
    const [game, setGame] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('access');

    useEffect(() => {
        const apiUrl = `http://localhost:8000/games/${id}/`

        fetch(apiUrl,
            {headers: {
            "Authorization": `Bearer ${accessToken}`,
          },}
        )
            .then(response => response.json())
            .then(data => setGame(data))
            
            .catch(error => {
                console.error('Error fetching game data:', error);
            });
    }, [id, accessToken]);

    // const handleApply = () => {
    //     // Redirect to the application page with the pet ID in the URL
    //     if (!is_logged_in){
    //       navigate('../login');
    //     }
    //     else {
    //       navigate(`/applications/${id}`);
    //     }
        
    // };

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Row xs={1} md={2} className="mx-auto d-flex align-items-top g-4 mt-2 mb-1 mx-5">
                <Col>
                    <img src={game.box_art !== null ? `${game.box_art}` : "/no_game_image.jpg"} alt="Game Art" className="img-fluid card" />
                </Col>

                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className='mb-3'>{game.title}</Card.Title>
                            <Card.Text>Console: {game.console_display}</Card.Text>

                            <Card.Text>Description: {game.description} </Card.Text>
                              
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default GameDetail;

