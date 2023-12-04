import express from 'express';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

const session = require('express-session');
const app = express();

app.get('/', autenticacao, (solicitacao, chave) => {

    const datadoultimoacesso = solicitacao.cookies.get("datadoultimoacesso");
    const data = new Date();
    chave.cookie("datadoultimoacesso", data.toLocaleString(),{
        maxAge: 1000*60*60*24*30,
        httpOnly: true
    });
    chave.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de usuario</title>
            </head>
            <body>
                <h1>CADASTRO</h1>
                <ul>
                    <li><a href="/cadastro.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
            <footer><p>Seu ultimo acesso foi em ${ultimoacesso}, NOME DE USUARIO: ${pessoa} </p></footer>
        </html>
    `);
})
app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});

function CadastroUsuario(solicitacao, chave) {
    if(!(dados.nome && dodos.email && dados.assunto && dados.sms)){
        conteudoresposta = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="estilo.css">
        </head>
        <body>
            <form class="form" action="#">
                <h1 class="titulo-form">Formulário de Contato</h1>
                <div class="input-group">
                
                    <input type="text" id="nome" name="text" class="input"  autocomplete="off" required="">
                    <label class="user-label" for="nome">Nome</label>
                
                </div>
                <div class="input-group">
                
                    <input type="text" id="email" name="email" class="input"  autocomplete="off" required="">
                    <label class="user-label" for="email">E-mail</label>
                
                </div>
                <div class="input-group">
                
                    <input type="text" id="assunto" name="assunto" class="input"  autocomplete="off" required="">
                    <label class="user-label" for="assunto">Assunto</label>
                
                </div>
                
                <div class="input-group">
                
                    <textarea type="text" id="sms" class="textarea" name="mensagem" rows="4" autocomplete="off" required=""></textarea>
                    <label class="user-label" for="sms">Mensagem</label>
                
                </div>
                <button class="btn-gradient">Enviar</button>
            </form> `
    }
    else{
    const usuario = {
        nome: solicitacao.query.nome,
        email: solicitacao.query.email,
        assunto: solicitacao.query.assunto,
        mensagem: solicitacao.query.sms,
    }

    listaUsuarios.push(usuario);
    let conteudoResposta = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstra@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1>Usuário cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Assunto</th>
                    <th>Mensagem</th>
                </tr>
            </thead>
            <tbody> `;

    for (const usuario of listaUsuarios) {
        conteudoResposta += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.assunto}</td>
                        <td>${usuario.sms}</td>
                    <tr>
                `;
    }

    conteudoResposta+=`
            </tbody>
        </table>
        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
        <a class="btn btn-primary" href="/cadastro.html" role="button">Continuar cadastrando</a>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    </html>`;
    chave.end(conteudoResposta);
 }
}
import cookieParser from 'cookie-parser';
import {Session} from 'inspector';

function autenticacao(solicitacao, chave, netxfunction){
    if(solicitacao.session.conectado){
        netxfunction();
    }
        else{
        chave.redirect("/conectado.html")
    }
}


app.use(cookieParser());
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*15
    }
}));

app.use(express.static(path.join(process.cwd(),'pagina')));
app.post('/conectado.html', (solicitacao,chave)=>{
    const pessoa = solicitacao.body.nome;
    const password = solicitacao.body.senha;
    if(!(pessoa && password && (pessoa === 'evellynloriely') && (senha === '11262004')) ){
        chave.end(`
        <!DOCTYPE html>
        <head>
            <meta charset="UTF-8">
            <title>Falha na Autenticação do Login</title>
        </head>
        <body>
            <h1>Dados invalidos! preencha os novamente</h1>
            <a href="/conectado.html">Volte aqui!</a>
        </body>
    `
    )
    }
    else{
        solicitacao.session.conectado = true;
        chave.redirect('/');
    }
})
