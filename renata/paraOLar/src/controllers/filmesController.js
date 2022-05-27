const dbConfig = require("../models/dbConfig");

async function dbConnect() {
    return await dbConfig.bancoDeDados("filmes");
}

const getAll = async(request, response) => {
    try{
        let filmesJson = await dbConnect();
        response.status(200).json(filmesJson);
    }catch(error){
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }

}

const getById = async(request, response) => {
    try{
        let filmesJson = await dbConnect();
        let idRequest = request.params.id;
    
        let filme = filmesJson.find(filme => filme.id == idRequest);
    
        response.status(200).json(filme);

    }catch (error){
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }
}

const getByTitle = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        let tituloRequest = request.query.titulo.toLowerCase();
        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest));
        response.status(200).json(filmeEncontrado);

    }catch (error) {
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }

}

const createMovie = async (request, response) => {
    try{
        let filmesJson = await dbConnect();
        let bodyRequest = request.body
    
        let novoFilme = {
            id: (filmesJson.length) + 1,
            title: bodyRequest.Title,
            year: bodyRequest.Year,
            rated: bodyRequest.Rated,
            released: bodyRequest.Released,
            runtime: bodyRequest.Runtime,
            genre: bodyRequest.Genre,
            director: bodyRequest.Director,
            writer: bodyRequest.Writer,
            actors: bodyRequest.Actors,
            plot: bodyRequest.Plot,
            language: bodyRequest.Language,
            country: bodyRequest.Country,
            awards: bodyRequest.Awards,
        }
    
        filmesJson.push(novoFilme);
    
        response.status(201).send({
            "mensagem": "filmes cadastrados com sucesso",
            novoFilme
        })

    } catch (error) {   
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }

}

const deleteMovie = async (request, response) => {
    try{
        let filmesJson = await dbConnect();
        let idRequest = request.params.id;
    
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);
    
        let indice = filmesJson.indexOf(filmeEncontrado);
        console.log(indice);
        filmesJson.splice(indice, 1)
    
        response.status(200).json([{
            "mensagem" : "Filme deletado com sucesso",
            "Filme-deletado" : filmeEncontrado,
            filmesJson
        }])

    }catch (error) {
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }
}

const updateMovie = async (request, response) => {
    try{
        let filmesJson = await dbConnect();
        let idRequest = request.params.id;
    
        let bodyRequest = request.body;
    
        let filmeEncontrado = filmesJson. find(filme => filme.id == idRequest);
    
        let indice = filmesJson.indexOf(filmeEncontrado);
    
        bodyRequest.id = idRequest;
    
        filmesJson.splice(indice, 1, bodyRequest)
    
        response.status(200).json([{
            "mensagem" : "Filme atualizado com sucesso",
            "Filme-atualizado" : bodyRequest,
            filmesJson
        }])

    } catch (error) {
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }
}

const updateTitulo = async (request, response) => {
    try {
        let filmesJson = await dbConnect();
        let tituloRequest = request.query.titulo.toLowerCase();
    
        let newTitle = request.body.Title;
    
        let filmeEncontrado = filmesJson.filter(filme => filme.Title.toLowerCase().includes(tituloRequest));
    
        filmeEncontrado.title = newTitle;
    
        response.status(200).json([{
            "mensagem" : "Titulo atualizado com sucesso",
            "Filme-atualizado" : filmeEncontrado,
            filmesJson
    
        }])

    } catch (error) {
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }

}


const updateById = async (request, response) => {
    try{
        let filmesJson = await dbConnect();
        let idRequest = request.params.id;
        let newTitle = request.body.title;
    
        let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);
    
        filmeEncontrado.title = newTitle;
        console.log(filmeEncontrado);
        response.status(200).json([{
            "mensagem" : "Titulo atualizado com sucesso",
            "Filme-atualizado" : filmeEncontrado,
            filmesJson
    
        }])

    }catch (error) {
        response.status(500).json({
            "mensagem": "Erro interno"
        })
    }

}


module.exports = {
    getAll,
    getById,
    getByTitle,
    createMovie,
    deleteMovie,
    updateMovie,
    updateTitulo,
    updateById,
}