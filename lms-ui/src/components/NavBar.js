import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = ({handleLogout}) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Library Management System</NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/loans">Loan Records</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/books">Books</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/authors">Authors</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/publishers">Publishers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/genres">Genres</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-end" style={{width: "100%"}} navbar>
                    <NavItem>
                        <NavLink tag={Link} onClick={handleLogout}>Log Out</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;
