const dbConfig = require("../models/dbConfig");

async function dbConnect() {
    return await dbConfig.bancoDeDados("series");
}

const getAll = async(request, response) => {
    let seriesJson = await dbConnect();
    response.status(200).json(seriesJson);
}

module.exports = {
    getAll,

}