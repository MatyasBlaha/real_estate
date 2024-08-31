import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/global/useUserContext.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from "react-bootstrap/NavDropdown";

import { getProfileIdFromCookies, getUsernameFromCookies } from "../../utils/cookieUtils.ts";
import { useLogout } from "../../hooks/auth/logout/useLogout.ts";

import UserDropdown from './UserDropdown.tsx';
import CurrencySelector from './CurrencySelector/CurrencySelector.tsx'


interface HeaderNavbarProps {
    title: {},
}

const HeaderNavbar: React.FC<HeaderNavbarProps> = () => {
    const profileId = getProfileIdFromCookies();
    const { user, setUser } = useUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const username = getUsernameFromCookies();
        if (username) {
            setUser(username);
        }
    }, [setUser]);

    const links = [
        { title: 'Profile', path: profileId ? `/profile/${profileId}` : '/create-profile' },
        { title: 'Create Estate', path: '/create-estate' },
    ];

    const { handleLogoutClick } = useLogout();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <Navbar className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand>
                        <NavDropdown.Item as={Link} className="text-primary" to='/'>Real - Estate</NavDropdown.Item>
                    </Navbar.Brand>
                    <CurrencySelector/>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        {user ? (
                            <UserDropdown
                                user={user}
                                links={links}
                                handleLogoutClick={handleLogoutClick}
                                isActive={isActive}
                            />
                        ) : (
                            <Navbar.Text>
                                <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>
                            </Navbar.Text>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default HeaderNavbar;
