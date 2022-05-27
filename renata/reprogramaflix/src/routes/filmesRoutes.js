//Rotas e metodos para filmes

//chamar o controller de filmes
const controller = require("../controllers/filmesController");

//chamando o Express
const express = require("express");
const app = require("../app");


//função de rotas do express - ela unifica tudo dentro de route, assim você não precisa exportar uma por uma
const router = express.Router();


//router.metodo http(rota, funcao que será executada nessa rota)
router.get("/catalogo", controller.getAll);

router.get("/catalogo/:id", controller.getById);

router.post("/cadastrar", controller.createMovie);


//exportando para ser usada no app.js
module.exports = router;