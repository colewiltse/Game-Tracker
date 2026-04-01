import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreateAccountPage = ({ setIsLoggedIn }) => {
    const createAccountUrl = 'http://localhost:8000/user/';
    const loginUrl = 'http://localhost:8000/api/token/';
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function handleSubmit(event) {
        let data = new FormData(event.target);

        fetch(createAccountUrl, {
            method: "POST",
            body: data,
        })
        .then(request => request.json())
        .then(json => {
            if ('id' in json) {
                fetch(loginUrl, {
                    method: "POST",
                    body: data,
                })
                .then(request => request.json())
                .then(json => {
                    if ('access' in json) {
                        localStorage.setItem('access', json.access);
                        localStorage.setItem('userId', json.id);
                        localStorage.setItem('email', data.get('email'));
                        setIsLoggedIn(true);
                        navigate('/game_list');
                    }
                    else {
                        setError("Unknown error while signing in. Please try again later.")
                    }
                })
            }
            else if ('email' in json) {
                setError("Account with thie email already exists.");
            }
            else {
                setError("Unknown error while signing in. Please try again later.")
            }
        })
        .catch(error => {
            console.error(error);
            setError("Unable to connect to server. Please try again later.");
        });

        event.preventDefault();


    }


    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Bootstrap demo</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
                crossOrigin="anonymous"
            />
            <Container className="sm mt-3" style={{ maxWidth: 600 }}>
                <Form onSubmit={handleSubmit}>
                <img
                    src="/Game Tracker Logo Sized.png"
                    className="img-fluid"
                    width={300}
                    alt="..."
                />
                <h2 className="mb-3">Create Account</h2>

                <Form.Group className="mb-3" controlId='formBasicEmail'>
                    <Form.Label>
                    Email
                    </Form.Label>
                    <Form.Control type='email' id='email' name='email'/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                    Password
                    </Form.Label>
                    <Form.Control type="password" id="password" name="password"/>
                </Form.Group>

                {error && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {error}
                    </div>
                )}
                <Button type="submit" className="btn btn-primary">
                    Submit
                </Button>

                </Form>
            </Container>
        </>
    );

};

export default CreateAccountPage;