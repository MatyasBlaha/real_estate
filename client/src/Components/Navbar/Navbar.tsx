import React, {useEffect} from "react";
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../../context/useUserContext.tsx'
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";

import {handleLogout} from "../../services/auth/logout/logout.helper.ts";
import {getUsernameFromCookies} from "../../utils/cookieUtils.ts";

const HeaderNavbar = () => {
    const { user, setUser} = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username)
        }
    }, [setUser]);

    const handleLogoutClick = async () => {
        try {
            await handleLogout({ navigate, setUser });
        } catch (err) {
            console.error('Error occurred while logging out:', err.message);
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Navbar className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand>
                        <NavDropdown.Item as={Link} className="text-primary" to='/'>Real - Estate</NavDropdown.Item>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        {user ? (
                            <NavDropdown title={user} id="user-dropdown" align="end">
                                <NavDropdown.Item as={Link} to='/profile' className={isActive('/profile') ? 'active' : ''}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider className="nav-dropdown-divider"/>
                                <NavDropdown.Item as={Link} to='/create-estate' className={isActive('/create-estate') ? 'active' : ''}>Create Estate</NavDropdown.Item>
                                <NavDropdown.Divider className="nav-dropdown-divider"/>
                                <NavDropdown.Item>
                                    <button className="dropdown-item text-decoration-none p-0" onClick={handleLogoutClick}>Logout</button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Navbar.Text>
                                <NavDropdown.Item as={Link} to='/login'>login</NavDropdown.Item>
                            </Navbar.Text>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderNavbar;