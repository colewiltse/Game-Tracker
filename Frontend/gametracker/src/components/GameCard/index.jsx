import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function GameCard ({ game }) {
    return(
        <Card as={Link} to={`/games/${game.id}`} className='h-100 text-decoration-none'>
            <Card.Img variant='top' src={game.box_art ? game.box_art : "/no_game_image.jpg"} alt="Game Art" style={{ height: '300px', objectFit: 'cover' }}/>
            <Card.Body>
                <h5 class="card-title text-truncate">{game.title}</h5>
                <Card.Text className='text-truncate'> {game.description} </Card.Text>
            </Card.Body>
        </Card>
    );
}