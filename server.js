const fs = require('fs');
const express = require('express');
const csv = require('csv-parser');
const app = express();

app.use(express.static('.')); 

app.get('/:id', function (req, res) {
    const id = req.params.id;

    fs.createReadStream('dados.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.id === id) {
            res.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" type="text/css" href="styles.css">
                    <title>Certificado de Conclusão</title>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Certificado de Conclusão</h1>
                        </div>
                        <div class="certificate">
                            <h1>${row.nome}</h1>
                            <p>Concluiu com êxito o curso de <strong>${row.curso}</strong></p>
                            <p>Carga Horaria:<strong>${row['carga horario']}</strong></p>
                            <p>Data de Conclusão: <strong>${row['data conclusao']}</strong></p>
                        </div>
                    </div>
                </body>
                </html>
            `);
        }
    })
    .on('end', () => {
        res.end();
    });
}).listen(8080, '0.0.0.0');


const QRCode = require('qrcode');

QRCode.toFile('qrcode.png', 'http://192.168.1.78:8080/1', {
  color: {
    dark: '#000',
    light: '#FFF' 
  }
}, function (err) {
  if (err) throw err
  console.log('👍')
});
