import { useForm, SubmitHandler } from "react-hook-form";
import React from 'react';
import { Container, Button, FormControl, FormGroup, FormLabel, Row, Col } from "react-bootstrap";




interface ProfileFormData {
    firstName: string;
    lastName: string;
    description: string;
    mobilePhone: string;
}

interface ProfileFormProps {
    onSubmit: SubmitHandler<ProfileFormData>;
    registeredName: string;
}

export const CreateProfileForm = ({onSubmit, registeredName}: ProfileFormProps) => {

    const {register, handleSubmit, formState: {errors}} = useForm<ProfileFormData>();

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={6} className="p-4 m-5">
                    <div className="bg-white shadow-sm p-4 md-5">
                        <form onSubmit={handleSubmit(onSubmit)}
                              className="flex felx=1 flex-col justify-content-evenly
                          ">
                            <FormGroup>
                                <FormLabel>first Name</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="First Name"
                                    defaultValue={registeredName}
                                    {...register('firstName', {required: true})}
                                />
                                {errors.firstName && <div style={{color: 'red'}}>first Name is required</div>}
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>lastName</FormLabel>
                                <FormControl
                                type="text"
                                placeholder="Last Name"
                                {...register('lastName', {required: true})}
                                />
                                {errors.lastName && <div style={{color: 'red'}}>Last Name is required</div>}
                            </FormGroup>


                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormControl
                                    as="textarea"
                                    rows={4}
                                    placeholder="Write something about yourself"
                                    {...register('description', {required: false})}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>profile picture</FormLabel>
                                <FormControl
                                type="file"
                                accept="image/*"
                                multiple={false}
                                {...register('profilePicture', {required: false})}
                                />
                            </FormGroup>

                            <Button
                                variant="primary"
                                type="submit"
                                className="mt-3"
                            >
                                <span>
                                    Create Profile
                                </span>
                            </Button>

                        </form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}