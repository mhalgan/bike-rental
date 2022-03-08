require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");
const db = require("./config/db");
const logger = require("./config/winston");

const app = express();

app.use(helmet());
app.use(express.json());

// Add routing
app.use("/api", routes);

// Add error handling after routes
app.use(errorHandler);

db.connect()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, logger.info(`Server is running ${PORT}`));
  })
  .catch((error) => {
    logger.error(error);
  });
