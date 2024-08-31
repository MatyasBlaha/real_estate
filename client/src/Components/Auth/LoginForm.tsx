import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl, FormLabel, Button, Row, Col, Container } from 'react-bootstrap';
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import Input from '../../Components/ui/forms/Input.tsx';


interface LoginFormData {
    email: string;
    password: string;
}
interface LoginFormProps {
    onSubmit: SubmitHandler<LoginFormData>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4} className="p-4 md-5">
                    <div className="bg-white shadow-sm p-4 p-md-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly">


                            <Input
                                type="email"
                                name="email"
                                label="Email address"
                                register={register}
                                required={true}
                                placeholder="Enter email"
                                errors={errors}
                            ></Input>

                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    type="password"
                                    placeholder="Enter password"
                                    autoComplete='current-password'
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

