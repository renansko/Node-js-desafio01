import { Database } from "../database/db.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "../utils/buildRoutePath.js"


const database = new Database

export const routes = [
    {
        method: 'POST',
        path: buildRoutePath("/tasks"),
        handler: async(req, res) => {
            const {title, description} = req.body

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: new Date().getTime(),
                updated_at: new Date().getTime()
            }

            database.insert('tasks', task)
            
            return res.writeHead(201).end()

        }
    },
    {
        method: 'GET',
        path: buildRoutePath("/tasks"),
        handler: (req, res) => {
            const { title, description } = req.query
            const data = {
                title,
                description
            }
            
            const task = database.select('tasks', data ? {
                title: title,
                description: description
            }: null)

            return res.end(JSON.stringify(task))

        }
    },
    {
        method: 'PUT',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description} = req.body


            const task = database.update('tasks', id, title, description)
            console.log(task)
            if(task === undefined){
                return res.writeHead(204).end()
            }else{
                return res.writeHead(404).end(JSON.stringify(task))
            }

        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.delete('tasks', id)

            if(task === undefined){
                return res.writeHead(204).end()
            }else{
                return res.writeHead(404).end(JSON.stringify(task))
            }

        }
    },

    {
        method: 'PATCH',
        path: buildRoutePath("/tasks/:id"),
        handler: (req, res) => {
            const { id } = req.params

            const task = database.taskStatus('tasks', id)

            if(task === undefined){
                return res.writeHead(204).end()
            }else{
                return res.writeHead(404).end(JSON.stringify(task))
            }
        }
    }
]