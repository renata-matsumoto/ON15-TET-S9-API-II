
//onde fica a lógica de negócio, da nossa api
//ficam as funções

//chamar o banco de dados
const dbConfig = require("../models/dbConfig");

//executei a conexão do banco de dados
async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes");
}

//getAll retorna todos os filmes

const getAll = async(request, response) => {
    let filmesJson = await dbConnect();
    response.status(200).json(filmesJson);
}

const getById = async(request, response) => {
    //Conecta no banco de dados
    let filmesJson = await dbConnect();
    let idRequest = request.params.id; //peguei o id enviado na request

    let filme = filmesJson.find(filme => filme.id == idRequest);

    //verifica se o filme existe
    response.status(200).json(filme);
    
}

const createMovie = async(request, response) => {
    let filmesJson = await dbConnect();
    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length)+1, 
        title: bodyRequest.Title, 
        description: bodyRequest.Plot 
    }
    filmesJson.push(novoFilme)
    
    response.status(201).send({
        "mensagem": "filmes cadastrado com sucesso",
        novoFilme
    })
}
    
//exportando cada função para ser usada nas routers 
module.exports = {
    getAll,
    getById,
    createMovie
}