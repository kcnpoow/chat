const mongoose = require('mongoose');

const messageSchema = require('./MessageSchema');

const schema = new mongoose.Schema({
  name: { type: 'string', required: true },
  messages: [messageSchema]
}, { collection: 'rooms' });

const Room = mongoose.model('Room', schema);

module.exports = Room;