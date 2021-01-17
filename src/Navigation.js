import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Component } from 'react';
import { Link } from "react-router-dom";


class Navigation extends Component {
    render() {
        return (
            <Navbar className="Nav" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">                    
                    <Link className="links" to="/">Home</Link>
                    <Link className="links" to="/upload">Upload</Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;
