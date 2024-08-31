import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const UserDropdown = ({ user, links, handleLogoutClick, isActive }) => {
    const renderNavItems = (links) => {
        return links.map((link, index) => (
            <React.Fragment key={index}>
                <NavDropdown.Item
                    as={Link}
                    to={link.path}
                    className={isActive(link.path) ? 'active' : ''}
                >
                    {link.title}
                </NavDropdown.Item>
                {index < links.length - 1 && <NavDropdown.Divider className="nav-dropdown-divider" />}
            </React.Fragment>
        ));
    };

    return (
        <NavDropdown title={user} id="user-dropdown" align="end">
            {renderNavItems(links)}
            <NavDropdown.Divider className="nav-dropdown-divider" />
            <NavDropdown.Item>
                <button className="dropdown-item text-decoration-none p-0" onClick={handleLogoutClick}>
                    Logout
                </button>
            </NavDropdown.Item>
        </NavDropdown>
    );
};

export default UserDropdown;
