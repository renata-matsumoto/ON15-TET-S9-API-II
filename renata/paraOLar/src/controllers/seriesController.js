const dbConfig = require("../models/dbConfig");

async function dbConnect() {
    return await dbConfig.bancoDeDados("series");
}

const getAll = async(request, response) => {
    try{
        let seriesJson = await dbConnect();
        response.status(200).json(seriesJson);
    }catch(error){
        response.status(500).json({
          message:error.message,
        })
    }
}

const getById = async(request, response) => {
    try{
        let seriesJson = await dbConnect();
        let idRequest = request.params.id;
    
        let series = seriesJson.find(serie => serie.id == idRequest);
    
        response.status(200).json(series);

    }catch (error){
        response.status(500).json({
            message:error.message,
          })
    }
}


const getByTitle = async (request, response) => {
    try{
        let seriesJson = await dbConnect();
        let tituloRequest = request.query.title.toLowerCase();
    
        let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest));
        response.status(200).json(serieEncontrada);

    }catch (error){
        response.status(500).json({
            message:error.message,
          })
    }
}



const getByGenre = async (request, response) => {
    try{
        let seriesJson = await dbConnect();
        let generoRequest = request.query.genre.toLowerCase();
        let serieEncontrada = seriesJson.filter(serie => serie.genre.toLowerCase().includes(generoRequest));
        response.status(200).json(serieEncontrada);

    } catch (error) {
        response.status(500).json({
            message:error.message,
          })
    }
}


const createSeries = async (request, response) => {
    try{

        let seriesJson = await dbConnect();
        let bodyRequest = request.body
    
        let novaSerie = {
            id: (seriesJson.length) + 1,
            title: bodyRequest.title,
            totalSeason: bodyRequest.totalSeason,
            genre: bodyRequest.genre,
            writers: bodyRequest.writers,
            poster: bodyRequest.poster,
            actors: bodyRequest.actors,
            ratings: bodyRequest.ratings,
        }
    
        seriesJson.push(novaSerie);
    
        response.status(201).send({
            "mensagem": "filmes cadastrados com sucesso",
            novaSerie,
        })
        
    } catch (error) {

        response.status(500).json({
            message:error.message,
          })
    }

}

const deleteSeries = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        let idRequest = request.params.id;
    
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest);
    
        let indice = seriesJson.indexOf(serieEncontrada);
        console.log(indice);
        seriesJson.splice(indice, 1)
    
        response.status(200).json([{
            "mensagem" : "Filme deletado com sucesso",
            "Serie-deletada" : serieEncontrada,
            seriesJson
        }])
        
    } catch (error) {
        response.status(500).json({
            message:error.message,
          })
    }
}

const updateSeries = async (request, response) => {
    try{
        let seriesJson = await dbConnect();
        let idRequest = request.params.id;
    
        let bodyRequest = request.body;
    
        let serieEncontrada = seriesJson. find(serie => serie.id == idRequest);
    
        let indice = seriesJson.indexOf(serieEncontrada);
    
        bodyRequest.id = idRequest;
    
        seriesJson.splice(indice, 1, bodyRequest)
    
        response.status(200).json([{
            "mensagem" : "Serie atualizada com sucesso",
            "Serie-atualizada" : bodyRequest,
            seriesJson
        }])

    } catch (error) {
        response.status(500).json({
            message:error.message,
          })
    }
}

const updateTitulo = async (request, response) => {
try{
    let seriesJson = await dbConnect();
    let tituloRequest = request.query.title.toLowerCase();
    let serieEncontrada = seriesJson.filter(serie => serie.title.toLowerCase().includes(tituloRequest));
    
    let newTitle = request.body.title;
    
    console.log(newTitle);
    serieEncontrada.title = newTitle;
    
    
    response.status(200).json([{
        "mensagem" : "Titulo atualizado com sucesso",
        "Titulo-atualizado" : newTitle,
        seriesJson
    }])
    
} catch (error) {

    response.status(500).json({
        message:error.message,
    })

} 
}


const updateById = async (request, response) => {
    try {
        let seriesJson = await dbConnect();
        let idRequest = request.params.id;
        let bodyRequest = request.body;
    
        let serieEncontrada = seriesJson.find(serie => serie.id == idRequest);
        console.log(serieEncontrada);
    
        let indice = seriesJson.indexOf(serieEncontrada);
    
        bodyRequest.id = idRequest;
    
        seriesJson.splice(indice, 1, bodyRequest)
    
        response.status(200).json([{
            "mensagem" : "Informação atualizada com sucesso",
            "Informação Atualizada" : bodyRequest,
            seriesJson
        }])

    } catch (error) {
        response.status(500).json({
            message:error.message,
          })
    }

}


module.exports = {
    getAll,
    getById,
    getByTitle,
    getByGenre,
    createSeries,
    deleteSeries,
    updateSeries,
    updateTitulo,
    updateById,
}