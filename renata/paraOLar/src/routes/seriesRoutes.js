const controller = require("../controllers/seriesController");

const express = require("express");
const app = require("../app");

const router = express.Router();

router.get("/catalogo", controller.getAll);

router.get("/:id", controller.getById);

router.get("/title", controller.getByTitle);

router.get("/genero", controller.getByGenre);

router.post("/criar", controller.createSeries);

router.delete("/deletar/:id", controller.deleteSeries);

router.put("/update/:id", controller.updateSeries);

router.patch("/update/titulo", controller.updateTitulo);

router.patch("/update/:id", controller.updateById);

module.exports = router;