import GameCard from '../../components/GameCard';
import React, { useEffect, useState } from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



const GameList = ({isLoggedIn}) => {
    const [games, setGames] = useState([]);
    const gameListUrl = 'http://localhost:8000/games/';
    const accessToken = localStorage.getItem('access');


    useEffect(() => {
        
        fetch(gameListUrl,
            {headers: {
            "Authorization": `Bearer ${accessToken}`,
          },}
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGames(data);
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, []); 


    return(
        <Container className="py-1">
            <Row xs={1} sm={2} md={4} lg={8} className="mb-4">
                { games.map(game => (
                    <Col>
                        <GameCard game={game} />
                    </Col>
                )) }
            </Row>
        </Container>
    );

};

export default GameList;