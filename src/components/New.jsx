import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Card, Container } from 'react-bootstrap';

export default function New() {
  const [books, setBooks] = useState([]);

  return (
    <Container>
      <h1>Book Details Form</h1>
      <BookForm setBooks={setBooks} />
      <h2 className="mt-4">Books List</h2>
      <BooksList books={books} />
    </Container>
  );
}

const BookForm = ({ setBooks }) => (
  <Formik
    initialValues={{ bookname: '', bookprice: '', authorname: '', imageUrl: '' }}
    onSubmit={(values, { resetForm }) => {
      setBooks(prevBooks => [...prevBooks, values]);
      resetForm();  // Reset form after submission
    }}
  >
    {({ handleSubmit, handleChange, values }) => (
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            name="bookname"
            value={values.bookname}
            onChange={handleChange}
            placeholder="Enter book name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Price</Form.Label>
          <Form.Control
            type="text"
            name="bookprice"
            value={values.bookprice}
            onChange={handleChange}
            placeholder="Enter book price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="text"
            name="authorname"
            value={values.authorname}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={values.imageUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

const BooksList = ({ books }) => {
  return (
    <div>
      {books.map((book, index) => (
        <Card key={index} className="my-3">
          <Card.Body>
            {book.imageUrl && (
              <Card.Img variant="top" src={book.imageUrl} alt={book.bookname} style={{ maxHeight: '200px', objectFit: 'cover' }} />
            )}
            <Card.Title>{book.bookname}</Card.Title>
            <Card.Text>
              <strong>Price:</strong> ${book.bookprice}
              <br />
              <strong>Author:</strong> {book.authorname}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
