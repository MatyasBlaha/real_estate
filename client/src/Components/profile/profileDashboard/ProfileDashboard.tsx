import React from 'react';
import { baseUrl } from '../../../config/baseUrl.config.ts'
import {ProfileHeading} from "./Heading/ProfileHeading.tsx";
import { useNavigation } from "../../../hooks/navigationHook.ts";

import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ProfileDashboard: React.FC = ({profile}) => {

    const { navigateTo } = useNavigation()

    const handleNavigate = (url) => {
        navigateTo(`/`);
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }




    return (
        <Container>
            <Button variant='link' className='link-dark' onClick={handleNavigate}>home</Button>
            <Row className='justify-content-center'>
                <Col md={12} lg={6} className='p-4 m-5'>
                    <div>
                        <ProfileHeading/>
                        <div className='d-flex'>
                            <div>
                                <img
                                    style={{height: '100px'}}
                                    src={`${baseUrl.API_BASE_URL}/uploads/${profile.avatarPath}`}
                                    alt={`${profile.firstName}'s avatar`}
                                />
                            </div>
                            <div>
                                <h1>{profile.firstName} {profile.lastName}'s Profile</h1>
                                <p>Description: {profile.description}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr/>
                    </div>
                </Col>
            </Row>

        </Container>
    );
}
