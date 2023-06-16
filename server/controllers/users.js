import User from '../models/User.js';

/* CREATE */
export const createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

/* READ */
export const getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};

/* DELETE */
export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
};