import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function MentalHealth() {
  const [currentPage, setCurrentPage] = useState('main');

  const goToDetails = (page) => {
    setCurrentPage(page);
  };

  // Main Page with Cards
  if (currentPage === 'main') {
    return (
      <Container className="mt-4">
        <h2>Mental Health Resources</h2>
        <p>Here you can find mindfulness exercises, meditation practices, and stress management tips to help maintain your mental well-being.</p>

        <Row>
          <Col md={4}>
            <Card style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/2850290/pexels-photo-2850290.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Mindfulness Exercise"
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Mindfulness Exercise</Card.Title>
                <Card.Text>Practice being in the moment with guided mindfulness activities.</Card.Text>
                <Button
                  style={{ backgroundColor: '#008080', borderColor: '#008080' }}
                  onClick={() => goToDetails('mindfulness')}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/6802940/pexels-photo-6802940.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Meditation Guides"
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Meditation Guides</Card.Title>
                <Card.Text>Access a variety of guided meditations for relaxation and focus.</Card.Text>
                <Button
                  style={{ backgroundColor: '#008080', borderColor: '#008080' }}
                  onClick={() => goToDetails('meditation')}
                >
                  Start Meditation
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card.Img
                variant="top"
                src="https://images.pexels.com/photos/10071614/pexels-photo-10071614.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                alt="Stress Management"
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>Stress Management Tips</Card.Title>
                <Card.Text>Explore techniques and tips for managing stress effectively.</Card.Text>
                <Button
                  style={{ backgroundColor: '#008080', borderColor: '#008080' }}
                  onClick={() => goToDetails('stress')}
                >
                  Explore Tips
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  // Mindfulness Details Page
  if (currentPage === 'mindfulness') {
    return (
      <Container className="mt-4">
        <h2>Mindfulness Exercise</h2>
        <p>Mindfulness is the practice of being fully present in the moment. Here are some activities you can try:</p>
        <ul>
          <li>Breathing exercises</li>
          <li>Body scan meditation</li>
          <li>Mindful walking</li>
        </ul>
        <Button style={{ backgroundColor: '#008080', borderColor: '#008080' }} onClick={() => setCurrentPage('main')}>
          Back to Resources
        </Button>
      </Container>
    );
  }

  // Meditation Guides Page
  if (currentPage === 'meditation') {
    return (
      <Container className="mt-4">
        <h2>Meditation Guides</h2>
        <p>Find peace and relaxation through guided meditations. Here are some suggestions:</p>
        <ul>
          <li>5-minute breathing meditation</li>
          <li>Body relaxation meditation</li>
          <li>Focus and clarity meditation</li>
        </ul>
        <Button style={{ backgroundColor: '#008080', borderColor: '#008080' }} onClick={() => setCurrentPage('main')}>
          Back to Resources
        </Button>
      </Container>
    );
  }

  // Stress Management Tips Page
  if (currentPage === 'stress') {
    return (
      <Container className="mt-4">
        <h2>Stress Management Tips</h2>
        <p>Manage your stress with these helpful tips:</p>
        <ul>
          <li>Take deep breaths and relax your muscles.</li>
          <li>Practice time management and take breaks.</li>
          <li>Engage in physical activities like exercise.</li>
        </ul>
        <Button style={{ backgroundColor: '#008080', borderColor: '#008080' }} onClick={() => setCurrentPage('main')}>
          Back to Resources
        </Button>
      </Container>
    );
  }

  return null;
}
