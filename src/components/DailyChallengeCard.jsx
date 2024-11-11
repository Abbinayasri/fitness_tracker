// DailyChallengeCard.jsx
import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function DailyChallengeCard({ imageUrl, challengeName, description }) {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{challengeName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <button
  style={{ ...buttonStyle, ...(isLocked || isCompleted ? {} : buttonHoverStyle) }}
  onClick={() => {
    if (!isLocked && !isCompleted) {
      onComplete();
      if (challengeName === '30-Day Challenge') {
        onProgress(); // Trigger scroll only when the 30-day challenge is started
      }
    }
  }}
  disabled={isLocked || isCompleted}
>
  {isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Start'}
</button>

      </Card.Body>
    </Card>
  );
}
