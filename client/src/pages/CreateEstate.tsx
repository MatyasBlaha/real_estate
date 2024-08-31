import React, {useState} from "react";
import SelectEstateForm from "../Components/estate/CreateEstateForm.tsx";
import {Container, Row, Col} from "react-bootstrap";



const CreateEstate: React.FC = () => {



    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={12} lg={6} className='p-4 m-5'>
                    <h1 className='text-center'>Create Property</h1>
                    <SelectEstateForm/>
                </Col>
            </Row>
        </Container>
)
}

export default CreateEstate;
