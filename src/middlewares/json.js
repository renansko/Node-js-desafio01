export async function json(req, res){
    const buffers = []

    // Utizando for await

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    // Aqui vamos ter um retorno como string que o node não entende como um json
    // Transformamos em um JSON (map) para mecher em seus atributos

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
    
    res.setHeader('Content-type', 'application/json')
}

// MIDDLEWARES estudar;