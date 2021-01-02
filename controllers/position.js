const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function (req, res) {
  try {
    const positions = await Position.find({
      id: req.params.categoryId,
      user: req.user.id
    });
    res.status(200).json({ positions });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      const: req.body.cost,
      category: req.body.category,
      user: req.user.id
    }).save();
    res.status(201).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function (req, res) {
  try {
    const position = await Position.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(position);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.delete = async function (req, res) {
  try {
    await Position.remove({ _id: req.params.id });
    res.status(200).json({
      message: 'Позиция была удаленна'
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
