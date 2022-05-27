const app = require("./src/app"); //chamando o arquivo app

const PORT = 7070 //porta - configuração de ambiente geralmente é maiúscula


//inicia o servidor
app.listen(PORT, () => {
    console.log(`Alô Docura!!! Tô na Porta ${PORT}`);
})