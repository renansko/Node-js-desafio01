import fs from 'node:fs/promises'

const databasePath = new URL('../database/db.json', import.meta.url)

export class Database{
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf8').then(data =>{
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    insert(table, data){
        if (Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }
        this.#persist();
        const contentTask = this.select('tasks')
        if(contentTask === undefined){
            return data
        }else{
            return data
        }
    }

    select(table, filter){
        let data = this.#database[table] ?? []
        if(!filter){
            return data
        }
        const values = Object.values(filter)
        const undefinedArray = values.every((val) => val === undefined)
        console.log(undefinedArray)

            if(filter && !undefinedArray){
                data = data.filter(row => {
                    return Object.entries(filter).some(([key, value]) => {
                        if(value){
                            return row[key].toLowerCase().includes(value.toLowerCase())
                        }
                    })
                })
        }

        return data
    }

    update(table, id, newTitle , newDescription){
        
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        
        if(rowIndex > -1){
            let task = this.#database[table][rowIndex]
            console.log(task)
            if (!newTitle && newDescription){
                task = {
                    id: task.id,
                    title: task.title,
                    discription: newDescription,
                    completed_at: task.completed_at,
                    created_at: task.created_at,
                    updated_at: task.updated_at

                }
            }
            if (newTitle && !newDescription){
                task = {
                    id: task.id,
                    title: newTitle,
                    discription: task.description,
                    completed_at: task.completed_at,
                    created_at: task.created_at,
                    updated_at: task.updated_at
                }
            }
            if (newTitle && newDescription){
                task = {
                    id: task.id,
                    title: newTitle,
                    discription: newDescription,
                    completed_at: task.completed_at,
                    created_at: task.created_at,
                    updated_at: task.updated_at
                }
            }
            this.#database[table][rowIndex] = task
            this.#persist()
            
        }else{
            const data = {
                message: "Id not found"
            } 
            return data
        }
  
    }
    delete(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1){
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }else{
            const data = {
                message: "Id not found"
            } 
            return data
        }
    }

    taskStatus(table, id){
        const rowIndex = this.#database[table].findIndex(row => row.id == id)
        
        if(rowIndex > -1){ 
        const task = this.#database[table][rowIndex]

        console.log(task)
        if(task.completed_at == null){
            task.completed_at = 'Concluido'
        }else{
            task.completed_at = null
        }
        this.#database[table][rowIndex] = task
        this.#persist()
        }else{
            const data = {
                message: "Id not found"
            } 
            return data
        }
        

    }
}