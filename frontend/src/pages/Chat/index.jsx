const React = require('react');
const { Container, Row, Col } = require('react-bootstrap');
const io = require('socket.io-client');

const RoomsList = require('./RoomsList');
const Room = require('./Room');

const socket = io('http://localhost:1111');

function Chat() {
  const [rooms, setRooms] = React.useState([]);
  const [currentRoom, setCurrentRoom] = React.useState({});

  const handleRoomClick = (roomId) => {
    if (roomId === currentRoom._id) {
      return;
    }

    if (currentRoom._id) {
      socket.emit('room leave', currentRoom._id);
    }

    socket.emit('room join', roomId);
  };

  const handleMessageSubmit = (msg) => {
    alert(msg);
  };

  React.useEffect(() => {
    (async () => {
      const response = await fetch('/api/chat/rooms');
      const result = await response.json();
      setRooms(result);
    })();
  }, []);

  React.useEffect(() => {
    socket.on('room create', (room) => {
      setRooms(prevRooms => [...prevRooms, room]);
    });

    socket.on('room join', (room) => {
      setCurrentRoom(room);
    });

    socket.on('message', (msg) => {
      setCurrentRoom((prevRoomState) => {
        const newRoomState = Object.assign({}, prevRoomState);
        newRoomState.messages = [...prevRoomState.messages, msg];
        return newRoomState;
      });
    });

    return () => {
      socket.off('room create');
      socket.off('room join');
      socket.off('message');
    };
  }, [socket]);

  return (
    <Container className='chat vh-100'>
      <Row className='h-100 align-items-center'>
        <Col className='chat__inner'>
          <Row className='h-100'>
            <Col className='chat-left-side py-3' xs={3}>
              <RoomsList rooms={rooms} onRoomClick={handleRoomClick} />
            </Col>
            <Col xs={9}>
              {currentRoom._id && <Room socket={socket} room={currentRoom} onMessageSubmit={handleMessageSubmit} />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

module.exports = Chat;