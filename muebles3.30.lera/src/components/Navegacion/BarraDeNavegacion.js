import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Navbar,Nav } from 'react-bootstrap';
import Cartwidget from './Cartwidget';
import { Link } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';



const NavBarBS = () => {
   const {cantidadItem} = useCartContext()

    return ( 
      <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Link to='/'>Inicio</Link>
        <Nav className="me-auto">
          <Link to="categoria/cocina">Cocina</Link>
          <Link to="categoria/comedor">comedor</Link>
          <Link to="categoria/sanitario">Sanitario</Link>
          <Link to="categoria/patio">Patio</Link>
          <Link to="categoria/living">Living</Link>
          <Link to="categoria/habitacion">Habitacion</Link>

          <Link to="/cart">
            <Cartwidget/>
           {cantidadItem() !== 0 && cantidadItem()}
          </Link>
        </Nav>
        </Container>
      </Navbar>
    
    </>
    )
}
export default NavBarBS

