import {Readable} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    
    // Stream de leitura
    _read() {
        const i = this.index++
        
        setTimeout(() => {
            if(i >= 10) {
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))
    
                this.push(buf)
            } // Streams não aceitam variaveis primarias, "Strings", "integers", etc
        }, 1000 )
    }
} // Stream de leitura -> Apenas ler dados

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
    }).then(response => {
        return response.text()
    }).then(data => {
            console.log(data)
    })
