const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const port = 3010;
var path = require('path')
const app = express()

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sistemaescolar',
})

connection.connect(function (err) {
    if (!err) {
        console.log("Conexão como o Banco realizada com sucesso!!!")
    } else {
        console.log("Erro: Conexão NÃO realizada", err)
    }
});

app.get('/', (req, res) => {
    res.send("Deu boa")
})

app.listen(port, () => {
    console.log(`Servidor Rodando na porta ${port}`)
})