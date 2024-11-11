import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'; // Import CSS for custom styles

export default function Navigation({ onSelect }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleShowSignUp = () => setShowSignUp(true);
  const handleCloseSignUp = () => setShowSignUp(false);

  return (
    <>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: '#660033' }} expand="lg" className="d-flex align-items-center">
        <Navbar.Brand
          href="#"
          style={{ marginLeft: '40px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center' }}
          onClick={() => onSelect('home')}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9670/9670557.png" // Path to the Beyoung symbol
            alt="Beyoung Logo"
            style={{ width: '30px', height: '30px', marginRight: '10px' }}
          />
          BEYOUNG.
        </Navbar.Brand>
        
        {/* Main navigation links */}
        <Nav className="d-flex align-items-center nav-items" style={{ gap: '20px' }}>
          <Nav.Item>
            <Nav.Link onClick={() => onSelect('workout-plans')} style={{ color: 'white' }}>Workout Plans</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => onSelect('food-control')} style={{ color: 'white' }}>Food Control</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => onSelect('activity-logs')} style={{ color: 'white' }}>Activity Logs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => onSelect('mental-health')} style={{ color: 'white' }}>Mental Health</Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Right-aligned Sign In and Sign Up links with consistent padding */}
        <Nav className="ms-auto d-flex align-items-center" style={{ gap: '10px' }}>
          <Nav.Item style={{ padding: '0 10px' }}>
            <Nav.Link href="#sign-in" style={{ color: 'white' }}>Sign In</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ padding: '0 10px' }}>
            <Nav.Link onClick={handleShowSignUp} className=".btn-outline-primary" style={{ color: 'white' }}>Sign Up</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      {/* Sign-Up Modal */}
      <Modal show={showSignUp} onHide={handleCloseSignUp} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseSignUp}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSignUp}>
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
