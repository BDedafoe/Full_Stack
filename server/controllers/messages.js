import Message from "../models/Message.js";
import User from "../models/User.js";

export const createMessage = async (req, res) => {
    try {
        const { userId, description, picture } = req.body;
        const user = await User.findById(userId);
        const newMessage = new Message ({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            subject,
            description,
            userPicture: user.picture,
            picture,
    });
    await newMessage.save();

    const message = await Message.find();
    res.status(201).json(message);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
    try {
        const message = await Message.find();
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserMessages = async (req, res) => {
    try {
      const { userId } = req.params;
      const message = await Message.find({ userId });
      res.status(200).json(message);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const message = await Message.findById(id);
           
        const updatedMessage = await Message.findByIdAndUpdate(
          id,
          { subject: message.subject },
          { new: true }
        );
    
        res.status(200).json(updatedMessage);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
    };

export const deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

