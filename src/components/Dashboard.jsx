import React, { useState } from 'react';
import Navigation from './Navigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkoutPlans from './WorkoutPlans';
import FoodControl from './FoodControl';
import MentalHealth from './MentalHealth';
import db from "../firebase"; // Firestore import
import { collection, addDoc, getDocs } from 'firebase/firestore'; // add getDocs for signin check
import ActivityLogs from './ActivityLogs' ;
import FamousTrainers from './FamousTrainers';
import './index.css';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('home');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [storedUsers, setStoredUsers] = useState([]); // For storing user details for sign-in check


  const quotes = [
    { text: "The only way to do great work is to love what you do. – Steve Jobs" },
    { text: "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer" },
    { text: "Don’t wait. The time will never be just right. – Napoleon Hill" },
    { text: "The future depends on what we do in the present. – Mahatma Gandhi" },
    { text: "The best way to predict the future is to create it. – Abraham Lincoln" },
  ];

  // Function to get a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex].text;
  };
  const handleViewChange = (view) => {
    if (!isSignedIn && (view === 'workout-plans' || view === 'food-control' || view === 'activity-logs' || view === 'mental-health')) {
      setShowSignInModal(true);
    } else {
      setCurrentView(view);
    }
  };

  const handleSignUp = async () => {
    try {
      // Store additional user details in Firestore
      await addDoc(collection(db, 'users'), {
        username,
        email,
        password, // Note: Don't store raw passwords in production, use hashing!
        age,
        height,
        weight,
        goal,
      });

      setIsSignedIn(true);  // Mark the user as signed in
      setShowSignUpModal(false);  // Close the sign-up modal
      setCurrentView('workout-plans');  // Navigate to the workout-plans page
    } catch (error) {
      console.error("Error signing up: ", error.message);
    }
  };

  // Sign In logic
  const handleSignIn = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map(doc => doc.data());
      setStoredUsers(users);  // Store all users' data for checking

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        setIsSignedIn(true); // If user is found, mark as signed in
        setShowSignInModal(false);  // Close the sign-in modal
        setCurrentView('workout-plans');  // Navigate to the workout-plans page
      } else {
        alert("Invalid credentials! Please try again.");
      }
    } catch (error) {
      console.error("Error signing in: ", error.message);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'workout-plans':
        return <WorkoutPlans />;
      case 'food-control':
        return <FoodControl />;
      case 'activity-logs':
        return <ActivityLogs />;
      case 'mental-health':
        return <MentalHealth />;
      default:
        return (
          <Container className="mt-4" style={{ backgroundColor: '#000', color: '#fff' }}>
            <Row className="align-items-center">
              <Col md={6} className="text-left">
                <h1 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'left' }}>
                  {isSignedIn ? `WELCOME, ${username}` : 'BEYOUNG.'}
                </h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
                  Wellness is the complete integration of body, food, and spirit.
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#ddd', lineHeight: '1.6' }}>
                  The Beyoung fitness tracker promotes a holistic approach to well-being, encompassing not only physical workouts but also a balanced diet and mental health support. The platform provides tools for tracking food intake and diet, maintaining mental wellness through sleep and meditation routines, and overall wellness resources. At Beyoung, fitness goes beyond exercise, recognizing the importance of integrating physical, nutritional, and mental health to foster complete wellness.
                </p>
                {!isSignedIn ? (
                  <>
                    <Button
                      onMouseEnter={(e) => (e.target.style.color = 'white')}
                      onMouseLeave={(e) => (e.target.style.color = '#555')}
                      onClick={() => setShowSignInModal(true)}
                      variant="outline-secondary"
                      style={{
                        borderColor: '#ccc',
                        color: 'white',
                        borderRadius: '5px',
                        padding: '8px 16px',
                        fontSize: '1rem',
                        marginRight: '10px',
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => setShowSignUpModal(true)}
                      variant="primary"
                      style={{
                        backgroundColor: '#008080',
                        borderColor: '#008080',
                        borderRadius: '5px',
                        padding: '8px 16px',
                        fontSize: '1rem',
                        marginLeft: '10px',
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : null}
              </Col>
              <Col md={6} className="text-center">
                <img
                  src="https://marketplace.canva.com/EAE-sPuIfWY/1/0/900w/canva-black-and-yellow-simple-grainy-textured-sand-watch-motivational-quote-about-time-phone-wallpaper-aOp3bK8P_GU.jpg"
                  alt="Fitness Inspiration"
                  style={{ width: '100%', height: 'auto', maxHeight: '490px', objectFit: 'cover' }}
                />
              </Col>
            </Row>
            {isSignedIn && <FamousTrainers />}
             {/* Quote Section at the Bottom */}
          <div style={{
            position: 'fixed',  // Position it fixed at the bottom
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#222',  // Dark background to match the theme
            color: '#fff',
            padding: '10px 0',
            textAlign: 'center',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            zIndex: 10,  // Make sure it stays on top of other content
          }}>
            "{getRandomQuote()}"
          </div>
          </Container>
        );
    }
  };

  return (
    <>
      <Navigation onSelect={handleViewChange} />
      {renderContent()}

      {/* Sign-In Modal */}
      <Modal show={showSignInModal} onHide={() => setShowSignInModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#fff' }}>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#222', color: '#fff' }}>
          <Form>
            <Form.Group controlId="formSignInEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }} 
              />
            </Form.Group>
            <Form.Group controlId="formSignInUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignInPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#222' }}>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowSignInModal(false)} 
            style={{ color: '#555', borderColor: '#ccc' }}
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSignIn} 
            style={{ backgroundColor: '#008080', borderColor: '#008080' }}
          >
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sign-Up Modal */}
      <Modal show={showSignUpModal} onHide={() => setShowSignUpModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#fff' }}>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#222', color: '#fff' }}>
          <Form>
            <Form.Group controlId="formSignUpUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignUpEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignUpPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignUpAge">
              <Form.Label>Age</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Age" 
                value={age}
                onChange={(e) => setAge(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignUpHeight">
              <Form.Label>Height</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Height" 
                value={height}
                onChange={(e) => setHeight(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignUpWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Weight" 
                value={weight}
                onChange={(e) => setWeight(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
            <Form.Group controlId="formSignUpGoal">
              <Form.Label>Fitness Goal</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Goal" 
                value={goal}
                onChange={(e) => setGoal(e.target.value)} 
                style={{ backgroundColor: '#333', color: '#fff' }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#222' }}>
          <Button 
            variant="outline-secondary" 
            onClick={() => setShowSignUpModal(false)} 
            style={{ color: '#555', borderColor: '#ccc' }}
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSignUp} 
            style={{ backgroundColor: '#008080', borderColor: '#008080' }}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
