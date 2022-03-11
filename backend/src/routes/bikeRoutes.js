const express = require("express");
const bikeController = require("../controllers/bikeController");

let router = express.Router();

router.post("/", bikeController.create);
router.get("/", bikeController.listAll);
router.get("/:id", bikeController.fetchDetails);
router.put("/:id", bikeController.updateBike);
router.delete("/:id", bikeController.deleteBike);

module.exports = router;
