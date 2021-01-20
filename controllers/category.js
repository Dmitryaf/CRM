const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({ user: req.user.id });
    setTimeout(() => {
      res.status(200).json(categories);
    }, 1000);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({ category });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.delete = async function (req, res) {
  try {
    await Category.remove({ _id: req.params.id });
    await Position.remove({ category: req.params.id });

    res.status(200).json({
      message: 'Категория удалена'
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (req, res) {
  const category = new Category({
    name: req.body.name,
    user: req.user.id,
    imgSrc: req.file ? req.file.path : ''
  });

  try {
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.update = async function (req, res) {
  const updated = {};

  if (req.file) {
    updated.imgSrc = req.file.path;
  }

  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
  } catch (error) {
    errorHandler(res, error);
  }
};
