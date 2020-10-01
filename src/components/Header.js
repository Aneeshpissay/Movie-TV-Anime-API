import React, {useState} from 'react';
import {Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import {NavLink} from 'react-router-dom';

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = ()=>{
        setIsNavOpen(!isNavOpen);
    }
  return (
    <div>
        <Navbar expand="md" dark>
            <NavbarBrand className="mr-auto">API</NavbarBrand>
            <NavbarToggler onClick={toggleNav} />
            <Collapse isOpen={isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to='/movie'> Movie API</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/tv-show'> TV API</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/anime'> Anime API</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    </div>
  );
}

export default Header;
