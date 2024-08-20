import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl, FormLabel, Button, Row, Col, Container } from 'react-bootstrap';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

interface LoginFormProps {
    onSubmit: SubmitHandler<{ email: string; password: string }>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>();

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="p-4 md-5">
                    <div className="bg-white shadow-sm p-4 p-md-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly">
                            <FormGroup>
                                <FormLabel>Email address</FormLabel>
                                <FormControl
                                    type="email"
                                    placeholder="Enter email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    type="password"
                                    placeholder="Enter password"
                                    {...register('password', { required: true })}
                                />
                                {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
                            </FormGroup>

                            <Button variant="primary" type='submit' className="mt-3">
                                <span>Login</span>
                            </Button>
                        </form>
                    </div>
                </Col>
                <Col md={6} lg={4} className="d-flex align-items-center justify-content-center p-4 p-md-5 text-center">
                    <div>
                        <h3>Don't have an account?</h3>
                        <p>Sign up now to create your account.</p>
                        <NavDropdown.Item as={Link} to='/register'>
                            <Button variant="primary">
                                <span>Sign up</span>
                            </Button>
                        </NavDropdown.Item>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;

