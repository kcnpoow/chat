const React = require('react');
const { Navigate, useNavigate } = require('react-router-dom');
const { Container, Row, Col, Form } = require('react-bootstrap');

const { UserContext } = require('../utils/UserContext');

function Signin() {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [user, setUser] = React.useContext(UserContext);

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUser(() => {
      sessionStorage.setItem('user', name);
      return name;
    });
    navigate('/chat', { replace: true });
  }

  if (user) {
    return <Navigate to='/chat' replace />
  }

  return (
    <Container className='vh-100'>
      <Row className='h-100 align-items-center justify-content-center'>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Control className='input' onChange={handleChange} />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

module.exports = Signin;