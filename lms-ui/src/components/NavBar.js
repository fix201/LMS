import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Library Management System</NavbarBrand>
            <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/loans">Loan Records</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/books">Books</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/authors">Authors</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/publishers">Publishers</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/genres">Genres</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="justify-content-end" style={{width: "100%"}} navbar>
                    <NavItem>
                        <NavLink href="">Log Out</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default AppNavbar;