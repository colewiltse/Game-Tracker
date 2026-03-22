import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';



const HomePage = ({isLoggedIn}) => {
    if (isLoggedIn) {
        console.log('We Logged In!!!')
    } else {
        console.log('Not logged in yet')
    }

    return (
        
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Bootstrap demo</title>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
                integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
                crossorigin="anonymous"
                />
            
            <Container className='text-center mt-5 pt-5'>
                <img
                src="/Game Tracker Logo Sized.png"
                className="img-fluid"
                width={500}
                alt="..."
                />
                <div className="d-flex justify-content-center gap-2">
                <Link to="/login">
                <Button className='btn btn-success'>
                    Log In
                </Button>
                </Link>
                <Button className="btn btn-danger">
                    Create Account
                </Button>
                </div>
            </Container>
        </>

    )
};

export default HomePage;

