import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import { Container, Button, FormControl, FormGroup, InputGroup, FormLabel, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";


const countryOptions = [
    { value: 'czechia', label: '🇨🇿 Czechia', code: '+420', maxLength: 9 },
    { value: 'poland', label: '🇵🇱 Poland', code: '+48', maxLength: 9 },
    { value: 'slovakia', label: '🇸🇰 Slovakia', code: '+421', maxLength: 9 },
    { value: 'germany', label: '🇩🇪 Germany', code: '+49', maxLength: 11 },
    { value: 'austria', label: '🇦🇹 Austria', code: '+43', maxLength: 11 },
    { value: 'us', label: '🇺🇸 US', code: '+1', maxLength: 7 },
];

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    password: string;
    phoneNumber: number;
}

interface RegistrationFormProps {
    onSubmit: SubmitHandler<RegistrationFormData>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegistrationFormData>();

    const [phoneCode, setPhoneCode] = useState('')
    const [maxLength, setMaxLength] = useState(0)
    const [placeholder, setPlaceholder] = useState<string>('')

    const selectedCountry = watch('country')

    React.useEffect(() => {
        const country = countryOptions.find(option => option.value === selectedCountry);
        if (country) {
            setPhoneCode(country.code);
            setMaxLength(country.maxLength);
            setPlaceholder(`eg. ${'12345678901234'.slice(0, country.maxLength)}`);
        } else {
            setPhoneCode('');
            setMaxLength(0);
            setPlaceholder(`Phone Number`);
        }
    }, [selectedCountry]);



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
                                    placeholder="First Name"
                                    {...register('firstName', { required: true })}
                                />
                                {errors.firstName && <div style={{ color: 'red' }}>First name is required</div>}
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Last name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Last Name"
                                    {...register('lastName', { required: true })}
                                />
                                {errors.lastName && <div style={{ color: 'red' }}>Last name is required</div>}
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Country</FormLabel>
                                <FormControl
                                    as="select"
                                    {...register('country', { required: true })}
                                >
                                    <option value="">Select a country</option>
                                    {countryOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </FormControl>
                                {errors.country && <div style={{ color: 'red' }}>Country is required</div>}
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Phone Number</FormLabel>
                                <InputGroup>
                                    <InputGroup.Text>{phoneCode}</InputGroup.Text>
                                    <FormControl
                                        type="tel"
                                        placeholder={placeholder}
                                        maxLength={maxLength}
                                        {...register('phoneNumber', { required: true })}
                                    />
                                </InputGroup>
                                {errors.phoneNumber && <div style={{ color: 'red' }}>Phone number is required</div>}
                            </FormGroup>


                            <FormGroup>
                                <FormLabel>Email address</FormLabel>
                                <FormControl
                                    type="email"
                                    placeholder="Enter email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <div style={{ color: 'red' }}>Email is required</div>}
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    type="password"
                                    placeholder="Enter password"
                                    {...register('password', { required: true })}
                                />
                                {errors.password && <div style={{ color: 'red' }}>Password is required</div>}
                            </FormGroup>

                            <Button
                                variant="primary"
                                type="submit"
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
};

export default RegistrationForm;
