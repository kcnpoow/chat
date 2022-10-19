const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: { type: 'string', required: true },
  text: { type: 'string', required: true }
});

module.exports = messageSchema;