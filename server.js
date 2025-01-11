const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const port = 3000;
var path = require('path')
const app = express()

app.use(session({ secret: 'gsdgsdfqfq2f3fd' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('/views', path.join(__dirname, '/views'))

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
        res.render('index')
    
})
app.get('/cadastrar-aluno', (req, res) => {
    res.render('cadastrar-aluno')

})
app.get('/modificar-nota', (req, res) => {
    res.render('modificar-nota')

})
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
        }
        res.redirect('/');
    });
});
app.get('/getUsers', (req, res) => {
    connection.query('SELECT id_usuario, nome_usuario, senha_usuario FROM usuario', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Erro ao buscar dados do banco de dados' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/', (req, res) => {
    global.nomelogin = req.body.nomelogin
    let senha = req.body.senhalogin

    connection.query("SELECT * FROM usuario where nome_usuario = '" + global.nomelogin + "'", function (err, rows, fields) {
        if (!err) {
            if (rows.length > 0) {
                if (rows[0].senha_usuario === senha) {
                    req.session.nomelogin = global.nomelogin
                    req.session.idlogin = rows[0].id_usuario
                    if (rows[0].professor == 1) {
                        res.render('pagina-inicial-adm', { login: global.nomelogin })
                    } else {
                        res.render('pagina-inicial', { login: global.nomelogin })
                    }
                } else {
                    res.render('login')
                }
            } else {
                res.send('Login Falhou - Usuário não cadastrado')
            }
        } else {
            console.log("Erro: Consulta não realizada", err)
            res.send('Login failed')
        }
    })
})

app.post('/criar_usuario', (req, res) => {
    const login = req.body.login;
    const senha = req.body.senha;
    const confirmasenha = req.body.confirmasenha;

    if (login.length > 0) {
        if (senha === confirmasenha) {
            const sql = "INSERT INTO usuario (nome_usuario, senha_usuario) VALUES (?, ?)";
            connection.query(sql, [login, senha], function (err, result) {
                if (!err) {
                    console.log("Usuário cadastrado com sucesso!");
                    res.render('pagina-inicial-adm');
                } else {
                    console.log("Erro ao inserir no banco de dados:", err);
                    res.status(500).send("Erro ao cadastrar usuário");
                }
            });
        } else {
            console.log("Erro ao confirmar senha!");
            res.render('criar_usuario');
        }
    } else {
        console.log("Login não preenchido");
        res.render('criar_usuario');
    }
});

app.listen(port, () => {
    console.log(`Servidor Rodando na porta ${port}`)
})