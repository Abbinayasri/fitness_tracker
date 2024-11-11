import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Trainers.css';

const trainers = [
  {
    name: 'Namrata Purohit',
    image: 'https://i.ytimg.com/vi/yYWTA4qYxu4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDnqPk5INxDbHDcljKVefXjVWiqpw',
    description: 'The Youngest Trained Stott Pilates Instructor in the world. A journey of a million miles begins with a small step. A renowned fitness trainer focusing on Pilates and overall body conditioning, helping clients achieve flexibility and strength.',
  },
  {
    name: 'Prasanth Sawant',
    image: 'https://i.ytimg.com/vi/96dzP6Ml1cQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDCf_BzrV0tXsLRIyKgsZtWafeMNQ',
    description: 'The driving force behind Body Sculptor, embraces the philosophy of "SCULPT YOUR DESIRE”. as he firmly believes that the pursuit of perfection is the key to attaining a harmonious state of physical, emotional, and spiritual well-being, thus fostering a healthier and more fulfilling lifestyle.',
  },
  {
    name: 'Radhika Karle',
    image: 'https://i.ytimg.com/vi/sdozLyy5Eig/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA9cSaRY6_iBynuaezjbBYM1o25UA',
    description: 'Radhika Karle is a Master Pilates Trainer, Pilates Educationist, Celebrity Fitness Trainer, Nutritionist and Co Author of Pure & Healthy – A Healthy Indian cook book. She is the only nutritionist in India to co-author a cook book. Radhika has a Master’s Degree (MS) from the US in Nutrition and Dietetics and a Fellowship in Adolescent and Sports Medicine.',
  },
  {
    name: 'Ranveer Allahabadia',
    image: 'data:image/jpeg;base64,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',
    description: 'Popularly known as BeerBiceps, Every day is a journey of exploration, learning, and growth. Over the past seven years, one key lesson has stood out: no matter your circumstances or activities, always strive for more.',
  },
];

const Trainers = () => {
  return (
    <Container className="py-4">
      <h2 className="text-left mb-4">Meet Our Trainers</h2>
      <Row>
        {trainers.map((trainer, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card className="trainer-card">
              <Card.Img variant="top" src={trainer.image} alt={trainer.name} />
              <Card.Body>
                <Card.Title>{trainer.name}</Card.Title>
                <Card.Text>{trainer.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Trainers;
