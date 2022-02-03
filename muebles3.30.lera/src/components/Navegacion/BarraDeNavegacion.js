import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Navbar,Nav } from 'react-bootstrap';
import Cartwidget from './Cartwidget';
import { Link } from 'react-router-dom';



const NavBarBS = () => {
    return ( 
      <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand to='/'>Inicio</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="categoria/cocina">Cocina</Link>
          <Link to="categoria/comedor">comedor</Link>
          <Link to="/cart"><Cartwidget/></Link>
        </Nav>
        </Container>
      </Navbar>
    
    </>
    )
}
export default NavBarBS

