import React from 'react';

const NavbarItem = ({children, onClick}) => {
    return (
        <li onClick={onClick}>
            {children}
        </li>
    )
}

export default NavbarItem