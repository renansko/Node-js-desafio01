/***
 * Sreams 
 * Exemplos de aplicações: Netflix, Spotify
 * 
 * Podemos utilizar dados, informações em pequenas partes
 * isso quer dizer que não precisamos do dado completo para começar a manipular ele
 * ou fazer o que for fazer com ele.
 *
 * Readable Streans
 *      Lendo aos poucos as informações
 * Writable Streams
 *      Enviando aos poucos as informações
 ***/

// Trabalhar com processos do NODE -> stdin ("Entrada/Lendo") e stdout("Saida/Escrevendo"/ Ler dados)


import { Readable } from 'node:stream'
import { Writable } from 'node:stream'
import { Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    
    // Stream de leitura
    _read() {
        const i = this.index++
        
        setTimeout(() => {
            if(i >= 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            } // Streams não aceitam variaveis primarias, "Strings", "integers", etc
        }, 1000 )
    }
} // Stream de leitura -> Apenas ler dados

class MutiplyByTenStream extends Writable{
    // Chunk é o pedaço que a gente vai ler da stream de leitura (Readable)
    // Enconding
    // Callback -> Retorno de quando terminar o que devia ser feito
    _write(chunk, enconding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
} // Stream de escrita apenas Processa o dado, Escrever dados

class NegativeNumberStream extends Transform{
    _transform(chunk, enconding, callback){
    const transformed = Number(chunk.toString()) * -1
    
    callback(null, Buffer.from(String(transformed)))
    }
} // Stream de transformação intermediario-> precisa ler dados de um local e escrever em outro

// instanciando nossa classe usando stream 
// utiliza pipe para encaminhar o processo std out
// então a classe criada vai retornar e o stdout joga os resultados para "fora"
new OneToHundredStream()
    .pipe(new NegativeNumberStream())
    .pipe(new MutiplyByTenStream())

// pipe "Encaminhar"
// process.stdin
//     .pipe(process.stdout)