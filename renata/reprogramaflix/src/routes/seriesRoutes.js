
const controller = require("../controllers/seriesController");

const express = require("express");
const app = require("../app");

const router = express.Router();

router.get("/", controller.getAll);

module.exports = router