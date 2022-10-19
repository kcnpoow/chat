const React = require('react');
const { Link } = require('react-router-dom');
const { Container, Row, Col, Button } = require('react-bootstrap');
const { CaretRightSquareFill } = require('react-bootstrap-icons');

function Home() {
  return (
    <Container className='vh-100' fluid>
      <Row className='h-100 align-items-center justify-content-center'>
        <Col xs='auto'>
          <Link className='d-flex' to='/chat'>
            <CaretRightSquareFill className='welcome-btn' size={100} color='#00ff00' />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

module.exports = Home;