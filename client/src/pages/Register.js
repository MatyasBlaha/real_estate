import {useForm} from "react-hook-form";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import React from "react";

const Register = ({onSubmit}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col justify-evenly"
        >

            <FormGroup>
                <FormLabel>First name</FormLabel>
                <FormControl
                    type="text"
                    placeholder="first Name"
                    {...register('firstName', { required: true })}
                >
                    {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                </FormControl>
            </FormGroup>

            <FormGroup>
                <FormLabel>Last name</FormLabel>
                <FormControl
                    type="text"
                    placeholder="last Name"
                    {...register('lastName', { required: true })}
                >
                    {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName.message}</div>}
                </FormControl>
            </FormGroup>

            <FormGroup>
                <FormLabel>Email address</FormLabel>
                <FormControl
                    type="email"
                    placeholder="Enter email"
                    {...register('email', { required: true })}
                >
                    {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
                </FormControl>
            </FormGroup>

            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl
                    type="password"
                    placeholder="Enter password"
                    {...register('password', { required: true })}
                >
                    {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
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
    );
}

export default Register;