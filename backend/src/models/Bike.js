const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
});

const bikeSchema = new mongoose.Schema(
  {
    model: {
      required: [true, "Model is required"],
      type: String,
    },
    color: {
      type: String,
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
    },
    rating: {
      type: Number,
    },
    available: {
      required: [true, "Availability is required"],
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

//Compile schema into model
const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
