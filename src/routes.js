import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/buildRoute-path.js'

/* 
* 
* podemos separar as rotas realizando uma constante que armezena 
* Alguns dados para realizar um match e acionar um função handler
* como visto a baixo para rodar o GET do users é necessario que o
* Path seja == /users e Method == GET para assim conseguir chamar
* o handler get 
*
*/ 

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { search } = req.query

            const user = database.select('users', search ? {
                name: search,
                email: search
            }: null)

            return res.end(JSON.stringify(user))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const {name , email} = req.body

            const user = {
                id: randomUUID(),
                name: name,
                email: email
            }
    
            database.insert('users', user)
    
            return res.writeHead(201).end()
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body

            database.update('users', id, {
                name,
                email,
            })

            return res.writeHead(204).end()
        }
    }
]