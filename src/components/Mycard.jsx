import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function DailyChallengeCard({ imageUrl, challengeName, description }) {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{challengeName}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Button variant="success">Start Challenge</Button>
      </Card.Body>
    </Card>
  );
}
