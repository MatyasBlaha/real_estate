import React, { useState } from 'react';

import { useForm } from 'react-hook-form'

import 'bootstrap/dist/css/bootstrap.min.css';
import { FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import NavDropdown from "react-bootstrap/NavDropdown";
import {Link} from "react-router-dom";

const LoginForm = ({ onSubmit }) => {

    //save firstName, lastName, email, password
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div className="flex">
            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-1 flex-col justify-evenly"
                >
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
                    >
                <span>
                    Login
                </span>
                    </Button>


                </form>
            </div>

            <div>
                <h3>Don't have an account?</h3>
                <p>Sign up now to create your account.</p>
                <NavDropdown.Item as={Link}  to='/register'>
                    <Button variant="primary">
                        <span>
                            Sign up
                        </span>
                    </Button>
                </NavDropdown.Item>
            </div>
        </div>
    );
};

export default LoginForm;