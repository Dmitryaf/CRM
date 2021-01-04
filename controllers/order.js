const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (res, req) {
  const query = {};

  // Дата старта
  if (req.query.start) {
    query.date = {
      $gte: req.query.start
    };
  }

  if (req.query.end) {
    if (!query.date) {
      query.data = {};
    }

    query.date['$lte'] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }

  try {
    const orders = Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    res.status(200).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.create = async function (res, req) {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({
      data: -1
    });
    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      user: req.user.id,
      list: req.body.list,
      order: maxOrder + 1
    }).save();
    res.status(201).json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};
