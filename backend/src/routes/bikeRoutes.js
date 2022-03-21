const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const bikeController = require("../controllers/bikeController");
const { roles } = require("../utils");

let router = express.Router();

router.get("/", verifyJWT(), bikeController.listAll);
router.get("/:id", verifyJWT(), bikeController.fetchDetails);
router.post("/", verifyJWT(roles.Manager), bikeController.create);
router.put("/:id", verifyJWT(roles.Manager), bikeController.updateBike);
router.delete("/:id", verifyJWT(roles.Manager), bikeController.deleteBike);

module.exports = router;
