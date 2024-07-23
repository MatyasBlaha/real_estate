import {useForm} from "react-hook-form";
import {Container, Button, FormControl, FormGroup, FormLabel, Row, Col} from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

const RegisterForm = ({onSubmit}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="p-4 md-5">
                    <div className="bg-white shadow-sm p-4 md-5">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-1 flex-col justify-evenly"
                        >

                            <FormGroup>
                                <FormLabel>First name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="first Name"
                                    {...register('firstName', {required: true})}
                                >
                                    {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Last name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="last Name"
                                    {...register('lastName', {required: true})}
                                >
                                    {errors.lastName && <div style={{color: 'red'}}>{errors.lastName.message}</div>}
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Email address</FormLabel>
                                <FormControl
                                    type="email"
                                    placeholder="Enter email"
                                    {...register('email', {required: true})}
                                >
                                    {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                                </FormControl>
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    type="password"
                                    placeholder="Enter password"
                                    {...register('password', {required: true})}
                                >
                                    {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
                                </FormControl>
                            </FormGroup>

                            <Button
                                variant="primary"
                                type='submit'
                                className="mt-3"
                            >
                                <span>
                                    Register
                                </span>
                            </Button>
                        </form>
                    </div>
                </Col>
                <Col md={6} lg={4} className="d-flex align-items-center justify-content-center p-4 md-5 text-center">
                    <div>
                        <h3>Already have an account?</h3>
                        <p>Sign up now to create your account.</p>
                        <NavDropdown.Item as={Link} to='/login'>
                            <Button variant="primary">
                            <span>
                                Login
                            </span>
                            </Button>
                        </NavDropdown.Item>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RegisterForm;