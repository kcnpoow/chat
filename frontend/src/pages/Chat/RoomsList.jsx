const React = require('react');
const { Row, Col, Form, Button } = require('react-bootstrap');
const io = require('socket.io-client');

const socket = io('http://localhost:1111');

function RoomsList(props) {
  const [roomName, setRoomName] = React.useState('');

  const handleChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName === '') {
      return;
    }

    socket.emit('room create', roomName);
    setRoomName('');
  };

  return (
    <Row className='h-100 flex-column'>
      <Col xs='auto'>
        <Form className='d-flex' onSubmit={handleSubmit}>
          <Form.Control className='input me-2' value={roomName} onChange={handleChange} />
          <Button className='button' type='submit'>Create</Button>
        </Form>
      </Col>
      <Col className='pt-2'>
        <div className='scroll-wrapper'>
          <div className="scroll-wrapper__inner">
            <ul className='rooms-list'>
              {props.rooms.map((room) =>
                <li className='rooms-list__item p-2' key={room._id} onClick={() => props.onRoomClick(room._id)}>
                  {room.name}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Col>
    </Row>
  );
}

module.exports = RoomsList;

/**
 * <Row className='mb-2'>
        <Col>
          <Form className='d-flex' onSubmit={handleSubmit}>
            <Form.Control className='input me-2' value={roomName} onChange={handleChange} />
            <Button className='button' type='submit'>Create</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className='scroll-wrapper'>
            <div className="scroll-wrapper__inner">
              <ul className='rooms-list'>
                {props.rooms.map((room) =>
                  <li className='rooms-list__item p-2' key={room._id} onClick={() => props.onRoomClick(room._id)}>
                    {room.name}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
 */