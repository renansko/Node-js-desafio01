import  http  from 'node:http'

import { Transform } from 'node:stream'

class NegativeNumberStream extends Transform{
    _transform(chunk, enconding, callback){
    const transformed = Number(chunk.toString()) * -1
    
    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
    }
} // Stream de transformação intermediario-> precisa ler dados de um local e escrever em outro

// req => ReadbleStream
// res => WriteableStream

const server = http.createServer(async (req, res) => {
    const buffers = []

    // A sintaxe de For Await permite percorrer a Stream inteira portanto
    // ela vai esperar terminar de ler a stream antes de seguir com o codigo

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    // Exemplo for await:
    // JSON -> Leitura completa se caso na Stream venha um JSON
    // {"Name": "Jonas", profissao: "marcineiro", "endereco": "rua"}

    // JSON -> Leitura parcial caso venha uma Stream e não lemos o conteudo todo 1º 
    // {"Name": "joans", profisao:}

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    // .pipe(new NegativeNumberStream())
    // .pipe(res)
})

server.listen(3334)