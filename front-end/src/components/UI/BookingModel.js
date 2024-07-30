import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Input from './Input';

const BookingModel = (props) => {
    const { _id, venueName, price, category, location, address, ownerId } = props;
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [redirectToCheckout, setRedirectToCheckout] = useState(false);

    const gotoCheckoutPage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate an async operation
        setTimeout(() => {
            setRedirectToCheckout(true);
            setIsLoading(false);
        }, 1000);
    }

    if (redirectToCheckout) {
        return <Redirect to='/default' />
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Booking Details📝
                </Modal.Title>
                <Button onClick={props.onHide}>X</Button>
            </Modal.Header>
            <Modal.Body>
                <h5>
                    <span style={{ color: 'red' }}><strong>Note: </strong></span>
                    Before booking always contact owner
                </h5>
                <hr />
                <Form onSubmit={gotoCheckoutPage}>
                    <Row>
                        <Col md={6}>
                            <Input
                                label='Select the Date for Event'
                                type='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                label='Venue Name'
                                type='text'
                                value={venueName}
                                isReadOnly={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input
                                label='Category'
                                type='text'
                                value={category}
                                isReadOnly={true}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                label='Location'
                                type='text'
                                value={location}
                                isReadOnly={true}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Input
                                label='Address'
                                type='text'
                                value={address}
                                isReadOnly={true}
                            />
                        </Col>
                        <Col md={6}>
                            <Input
                                label='Bill'
                                type='number'
                                value={price}
                                isReadOnly={true}
                                message='With Service tax included in Bill'
                            />
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button variant="success" type="submit">
                            {
                                isLoading ?
                                    <>
                                        <Spinner animation="border" as="span" size="sm" variant="light" />
                                        {" "} Processing...
                                    </>
                                    :
                                    <span>Payment</span>
                            }
                        </Button>

                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default BookingModel;
