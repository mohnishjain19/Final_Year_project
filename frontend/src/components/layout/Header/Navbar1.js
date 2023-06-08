import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PersonIcon from "@material-ui/icons/Person";
import { useNavigate } from 'react-router-dom';
const Navbar1 = () => {
    const history=useNavigate();
    const submitHandler =() =>{
        history("/bookatest");
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="/">Cognitive Health Analysis</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Nav  navbarScroll>
                <Nav.Link href="/login"><PersonIcon />Login/SignUp</Nav.Link>
                <Button onClick={submitHandler} variant="outline-success">Book a Test</Button>
                </Nav>

              
              </Form>
            </Navbar.Collapse>
            
          </Container>
        </Navbar>
    );
}

export default Navbar1;