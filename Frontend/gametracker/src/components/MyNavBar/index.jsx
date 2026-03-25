import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Navbar from 'react-bootstrap/Navbar';


export default function MyNavBar() {
    return(
       <Navbar expand="lg" className="bg-body-tertiary">
        <Container className='fluid'>
            <NavbarBrand href='/game_list'>
                <img src='/Game Tracker Logo Sized.png' alt="logo" width="200" height="35"/>
            </NavbarBrand>

            <div>
                <Button variant="success">Add Game</Button>
                <Button variant="info">Profile</Button>
                <Button variant="danger">Log Out</Button>
            </div>

        </Container>
       </Navbar>
    );
}