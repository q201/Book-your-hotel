import React, { useState } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Default = () => {
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleHomePageRedirect = () => {
        setRedirectToHome(true);
    };

    if (redirectToHome) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <Row>
                <Col style={{ marginTop: '200px', fontSize: '100px' }} className="text-center text-muted">
                    Default Page ...
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Button variant="primary" onClick={handleHomePageRedirect}>
                    Go to home page
                </Button>
            </Row>
        </div>
    );
};

export default Default;
