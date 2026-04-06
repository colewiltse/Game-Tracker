import React, { useState } from 'react';
import { fetchWithAuth } from '../../api';
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const AccountEditPage = () => {
    const apiUrl = `/user/info/`
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: localStorage.getItem("email"),
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();

        if(formData.email){
            data.append("email", formData.email)
        }

        if(formData.password){
            data.append("password", formData.password)
        }

        fetchWithAuth(apiUrl, {
            method: "PATCH",
            body: data,
        })
        .then(request => request.json())
        .then(json => {
            if ('id' in json) {
                localStorage.setItem('email', data.get('email'));
                navigate('/account_info');
            }
            else {
                setError("Unknown error. Please try again later.")
            }
        })
        .catch(error => {
            console.error(error);
            setError("Unable to connect to server. Please try again later.");
        });
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
                <Form onSubmit={handleSubmit}>
                <h2 className="mb-3">Edit Account</h2>

                <Form.Group className="mb-3" controlId='formBasicEmail'>
                    <Form.Label>
                    Email
                    </Form.Label>
                    <Form.Control type='email' id='email' name='email' value={formData.email} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                    Password
                    </Form.Label>
                    <Form.Control type="password" id="password" name="password" value={formData.password} onChange={handleChange}/>
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

export default AccountEditPage;