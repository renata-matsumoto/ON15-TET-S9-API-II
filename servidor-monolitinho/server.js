const ghibliJson = require("./data/ghibli.json")
const filmesJson = require("./data/filmes.json")
const seriesJson = require("./data/series.json")

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (request, response)=>{
    response.status(200).json([
        {
            "mensagem":"API de filmes Ghibli"
        }
    ])
})


app.get("/ghibli/filmes", (request, response)=>{
    response.status(200).send(ghibliJson)
})



app.get("/ghibli/buscar/:id", (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    response.status(200).send(filmeEncontrado)

})

app.get("/ghibli/filtro", (request, response)=>{
    let tituloRequest = request.query.titulo.toLowerCase()

    let filmeEncontrado = ghibliJson.filter(
        filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
})


app.post("/ghibli/cadastrar", (request,response)=>{
    let bodyRequest = request.body

    let novoFilme = {
        id: (ghibliJson.length)+1, 
        title: bodyRequest.title, 
        description: bodyRequest.description 
    }
    ghibliJson.push(novoFilme)
    
    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
})

app.delete("/ghibli/deletar/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    //Pegar o índice do filme que será deletado
    let indice = ghibliJson.indexOf(filmeEncontrado)
    console.log(indice)

    //Array.splice(indice, 1)(indice, numero de itens que você quer deletar e depois o que você quer inserir)
    ghibliJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "filme deletado com sucesso",
        "filme-deletado" : filmeEncontrado,
        ghibliJson
    }])

})

//metodo PUT - tem a função de substituir o dado que está no banco de dados

app.put("/ghibli/substituir/:id", (request, response) => {
    //pegar id enviado no path params
    let idRequest = request.params.id

    //pegar o body enviado
    let bodyRequest = request.body

    //encontrar o filme com o id enviado no request
    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    //pegar o índice do filme que será substituido (posição do array)
    let indice = ghibliJson.indexOf(filmeEncontrado)

    //id enviado no body tem que ser igual ao id do filme que está no array
    bodyRequest.id = idRequest


    //deleta o filme existenta e substituir pelo filme que está no body
    ghibliJson.splice(indice, 1, bodyRequest)

    console.log(ghibliJson.splice(indice, 1, bodyRequest))

    response.status(200).json([{
        "mensagem": "filme atualizado com sucesso",
        "filme-atualizado": bodyRequest,
        ghibliJson
    }])
})

//metodo PATCH - tem a função de atualizar apenas um dado do banco de dados já existente
app.patch("/ghibli/updateTitulo/:id", (request, response) => {
    let idRequest = request.params.id
    let newTitle = request.body.title

    let filmeEncontrado = ghibliJson.find(filme => filme.id == idRequest)

    filmeEncontrado.title = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        "filme-atualizado": filmeEncontrado,
        ghibliJson
    }])

})

app.listen(3030, ()=>{
    console.log("alô, pepe moreno? to na porta 3030")
})