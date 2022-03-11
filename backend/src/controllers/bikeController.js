const Bike = require("../models/Bike");

const create = async (req, res, next) => {
  const { model, color, location } = req.body;

  try {
    const bike = await Bike.create({
      model,
      color,
      location,
      rating: null,
      available: false,
    });

    res.json(bike);
  } catch (error) {
    return next(error);
  }
};

const listAll = async (req, res, next) => {
  try {
    const bikes = await Bike.find({});
    res.json(bikes);
  } catch (error) {
    return next(error);
  }
};

const fetchDetails = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBike = await Bike.findByIdAndDelete(id);
    res.json(deletedBike);
  } catch (error) {
    return next(error);
  }
};

const deleteBike = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBike = await Bike.findByIdAndDelete(id);
    res.json(deletedBike);
  } catch (error) {
    return next(error);
  }
};

const updateBike = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBike = await Bike.findByIdAndDelete(id);
    res.json(deletedBike);
  } catch (error) {
    return next(error);
  }
};

module.exports = { create, listAll, fetchDetails, deleteBike, updateBike };
