import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Component } from 'react';
import { Link } from "react-router-dom";


class Navigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Navbar className="Nav" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">                    
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/upload">Upload</Link></Nav.Link>
                </Nav>
                <Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    <Nav.Link href="#home">Login</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export default Navigation;
