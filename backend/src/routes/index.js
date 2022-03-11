const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const bikeRoutes = require("./bikeRoutes");

router.use("/users", userRoutes);
router.use("/bikes", bikeRoutes);

module.exports = router;
