//server para centralizar o conteúdo da aplicação
//e para configurar as rotas raízes - nesse caso filmes e series
//coloca o cors aqui

//chamei o express
const express = require("express");
const app = express();


app.use(express.json());

//import da continuação das rotas de filme
const filmesRoutes = require("./routes/filmesRoutes");
const seriesRoutes = require("./routes/seriesRoutes");

//criando rota raiz de filmes
app.use("/filmes/", filmesRoutes);

//criando a rota raiz de series

app.use("/series/", seriesRoutes);

//exportando para usar o app no server.js
module.exports = app;