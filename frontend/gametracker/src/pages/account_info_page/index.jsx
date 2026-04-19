import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWithAuth } from '../../api';

import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import CardText from 'react-bootstrap/esm/CardText';
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

