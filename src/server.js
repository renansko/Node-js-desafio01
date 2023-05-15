// Modulo http serve para construir aplicações HTTP 
// Rotas basicamente.

// const http = require('http') ComandJS

// para diferenciar modulos terceiros e do proprio node utilize a notação a baixo
// node:"Modulo do node"

import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extractQueryParams.js'

// ComandJS => require - padrão de importação no NODE

/** 
 *      ESModules => import/export
 *      Node naturalmente não aceita
 *      Para o node Aceitar o ESModules
 *      coloque essa configuração no package.json:   
 *      "type": "module",
**/ 

// - HTTP principais informações de uma requisição
//     - Método HTTP
//     - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso no back-end
// POST => Criar um recurso no Back-end
// PUT => Atualizar um recurso no Back-end
// PATCH => Atualizar um recurso especifica de um recurso no Back-end
// DELETE => Deletar um recurso

/*
 * Stateful:
 *      Dados armazenados em memoria
 * 
 * Stateless:
 *      Dados armazendos externamente, "Banco de dados"
 * 
*/ 

/**
 * Query Parameters: Stateful => 
 *      Dados nao sensiveis: Filtros, paginação
 *          -> Não obrigatorios
 * 
 * Route Parameters: Identificação de recurso
 * 
 * Request Body: Envio de informações 
 *      Envio dessas informações é a parte do http
 * 
 * http://localhost:333/users?user=1 < Query parameters
 * 
 * http://localhost:3333/users/1 < Route parameters
*/

// Cabeçalhos 'Headers' (Requisição/reposta) => Metadados

// const database = new Database

// Criar o "server"
const server = http.createServer(async(req, res) => {
    const { method, url} = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path.test(url)
    })

    if (route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params} = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    // if ( method == 'GET' && url == '/users'){
    //     const user = database.select('users')

    //     return res.end(JSON.stringify(user))
        
    //     // JSON - JavaScript Object Notation
    //     // Comunicação de dados entre Front <=> Back

    // }   // Early return

    // if ( method == 'POST' && url == '/users'){
    //     const {name , email} = req.body

    //     const user = {
    //         id: randomUUID,
    //         name: name,
    //         email: email
    //     }

    //     database.insert('users', user)

    //     return res.writeHead(201).end()
    // }   // Early return

    return res.writeHead(404).end()
})

server.listen(3333)

// Server vai rodar na rota localhost:3333

/* 
    OBS: o server não atualiza suas mudanças automaticamente
    Para isso o Node disbonibilizou uma função --watch
    basta rodar o segunte comando node --watch "Path do server"
    EX: node --watch .\src\server.js
    pode colocar esse comando no script do package.json

*/