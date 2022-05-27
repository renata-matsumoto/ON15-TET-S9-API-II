const controller = require("../controllers/filmesController");

const express = require("express");
const app = require("../app");

const router = express.Router();

router.get("/catalogo", controller.getAll);

router.get("/:id", controller.getById);

router.get("/titulo", controller.getByTitle);

router.post("/criar", controller.createMovie);

router.delete("/deletar/:id", controller.deleteMovie);

router.put("/update/:id", controller.updateMovie);

router.patch("/updade/titulo", controller.updateTitulo);

router.patch("update/:id", controller.updateById);

module.exports = router;