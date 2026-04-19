import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import API_BASE from '../../base_url';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


const LoginPage = () => {
    const loginUrl = `${API_BASE}/api/token/`;
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        let data = new FormData(event.target);
        setLoading(true);

        fetch(loginUrl, {
            method: "POST",
            body: data,
        })
        .then(request => request.json())
        .then(json => {
            if ('access' in json) {
                localStorage.setItem('access', json.access);
                localStorage.setItem('refresh', json.refresh);
                localStorage.setItem('email', data.get('email'));
                navigate('/game_list');
            }
            else if ('detail' in json) {
                setError("Incorrect email or password.");
            }
            else {
                setError("Unknown error while signing in. Please try again later.")
            }
        })
        .catch(error => {
            console.error(error);
            setError("Unable to connect to server. Please try again later.");
        })
        .finally(()=> {
            setLoading(false);
        });

        event.preventDefault();

    }


    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Game Tracker</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
                crossOrigin="anonymous"
            />
            <Container className="sm mt-3" style={{ maxWidth: 600 }}>
                <Link to="/" >
                        <img
                            src="/Game_Tracker_Logo_Sized.png"
                            className="img-fluid"
                            width={300}
                            alt="..."
                        />
                    </Link>
                <Form onSubmit={handleSubmit}>
                    
                <h2 className="mb-3">Log In</h2>

                <Form.Group className="mb-3" controlId='formBasicEmail'>
                    <Form.Label>
                    Email
                    </Form.Label>
                    <Form.Control type='email' id='email' name='email' required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                    Password
                    </Form.Label>
                    <Form.Control type="password" id="password" name="password" required/>
                </Form.Group>

                <ErrorAlert error={error}/>
                
                <Button type="submit" className="btn btn-primary">
                    Submit
                </Button>

                </Form>
                
                <LoadingSpinner loading={loading}/>

            </Container>
        </>
    );

};

export default LoginPage;