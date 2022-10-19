const Room = require('../models/Room');
const Message = require('../models/Room/MessageSchema');

class Chat {
  async createRoom(req, res) {
    try {
      const { name } = req.body;

      const room = await Room.create({ name });

      res.status(200).json(room);
    } catch (err) {
      console.log(err);
    }
  }

  async rooms(req, res) {
    try {
      const rooms = await Room.find().select('name _id');;

      res.status(200).json(rooms);
    } catch (err) {
      console.log(err);
    }
  }

  async room(req, res) {
    try {
      const { id } = req.query;

      const room = await Room.findById(id);

      res.status(200).json(room);
    } catch (err) {
      console.log(err);
    }
  }

  async createMessage(req, res) {
    try {
      const { author, text, roomId } = req.body;

      await Room.findByIdAndUpdate(roomId, {
        $push: { messages: { author, text } }
      });

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new Chat();