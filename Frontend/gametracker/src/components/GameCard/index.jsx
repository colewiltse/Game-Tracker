import Card from 'react-bootstrap/Card';

export default function GameCard ({ game }) {
    return(
        <Card className='h-100'>
            <Card.Img variant='top' src={game.box_art ? game.box_art : "/no_game_image.jpg"} alt="Game Art"/>
            <Card.Body>
                <h5 class="card-title">{game.title}</h5>
                <Card.Text> {game.description} </Card.Text>
            </Card.Body>
        </Card>
    );
}