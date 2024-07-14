import React, {useContext} from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarItem from "./NavbarItem";

const HeaderNavbar = () => {
    const { user} = useContext(UserContext)


    return (
        <>
            <Navbar className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand href='/'>Real Estate</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className='justify-content-end'>
                        {user ? (
                            <Navbar.Text>
                                <NavbarItem>
                                    <Link to='/Login'>{user}</Link>
                                </NavbarItem>
                            </Navbar.Text>
                        ) : (
                            <Navbar.Text>
                                <NavbarItem>
                                    <Link to='/Login'>Login</Link>
                                </NavbarItem>
                            </Navbar.Text>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default HeaderNavbar;