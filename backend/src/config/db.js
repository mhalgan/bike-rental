const mongoose = require("mongoose");
const logger = require("./winston");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  logger.info("MongoDB connected!");
};

module.exports = { connect };
