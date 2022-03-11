const mongoose = require("mongoose");

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
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
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
