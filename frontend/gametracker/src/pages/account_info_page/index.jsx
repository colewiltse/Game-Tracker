import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const AccountInfo = () => {

    return (
        <Container className='sm mt-3' style={{ maxWidth: 600 }}>
            <Card>
            <Card.Body>
                <Card.Title className='mb-3'>Account Info</Card.Title>
                <Card.Text>Email: {localStorage.getItem("email")}</Card.Text>

                <Link to={`/account_edit`}>
                <Button> Edit </Button>
                </Link>  
            </Card.Body>
                </Card>
        </Container>
    );
};

export default AccountInfo;

