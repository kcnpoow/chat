const React = require('react');
const { Row, Col, Form } = require('react-bootstrap');

const { UserContext } = require('../../utils/UserContext');

function MessagesWindow(props) {
  const [user] = React.useContext(UserContext);
  const [message, setMessage] = React.useState('');
  const socket = props.socket;
  const $scrollWrapper = React.useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    socket.emit('message', { author: user, text: message, roomId: props.room._id });
    setMessage('');
  };

  const scrollToBottom = () => {
    $scrollWrapper.current.scrollTop = $scrollWrapper.current.scrollHeight;
  };


  React.useEffect(() => {
    scrollToBottom();
  }, [props.room]);

  React.useEffect(() => {
    socket.on('message', scrollToBottom);

    return () => {
      socket.off('message');
    };
  }, [socket]);

  return (
    <Row className='h-100 py-3 flex-column'>
      <Col xs='auto'>
        <h3>{props.room.name}</h3>
      </Col>
      <Col className='pb-3'>
        <div className='scroll-wrapper' ref={$scrollWrapper}>
          <div className='scroll-wrapper__inner'>
            {props.room.messages.map((msg, i) =>
              <Row key={i}>
                <Col>
                  {msg.author}: {msg.text}
                </Col>
              </Row>
            )}
          </div>
        </div>
      </Col>
      <Col xs='auto'>
        <Form onSubmit={handleSubmit}>
          <Form.Control className='input' value={message} onChange={handleChange} />
        </Form>
      </Col>
    </Row>
  );
}

module.exports = MessagesWindow;