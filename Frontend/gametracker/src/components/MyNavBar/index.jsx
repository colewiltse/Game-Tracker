import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



export default function MyNavBar({ setIsLoggedIn }) {

    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setIsLoggedIn(false); 
    navigate('/login');
    };

    return(
       <Navbar expand="lg" className="bg-body-tertiary">
        <Container className='fluid'>
            <NavbarBrand as={Link} to="/game_list">
                <img src='/Game Tracker Logo Sized.png' alt="logo" width="200" height="35"/>
            </NavbarBrand>

            <div>
                <Link to="/game_create">
                <Button variant="success">Add Game</Button>
                </Link>
                
                <Link to="/account_info">
                <Button variant="info">Profile</Button>
                </Link>

                <Button variant="danger" onClick={handleLogout}>Log Out</Button>
            </div>

        </Container>
       </Navbar>
    );
}