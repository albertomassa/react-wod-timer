
import React, { useState } from 'react';

import { Link } from 'react-router-dom'

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import '../css/views/Header.css';

const Header = () => {

  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <Navbar color="faded" className="header" light>
        <NavbarBrand href="/" className="mr-auto header-title">SPARTAN'S TIMER</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="header-toggle-icon header-toggler " />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link onClick={toggleNavbar} className="header-item" to="/amrap/">AMRAP</Link>
            </NavItem>
            <NavItem>
              <Link onClick={toggleNavbar} className="header-item" to="/emom/">EMOM</Link>
            </NavItem>
            <NavItem>
              <Link onClick={toggleNavbar} className="header-item" to="/tabata/">TABATA</Link>
            </NavItem>
            <NavItem>
              <Link onClick={toggleNavbar} className="header-item" to="/stopwatch/">STOPWATCH</Link>
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
  );
  
}

export default Header
