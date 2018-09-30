const express = require('express')
const server = express()

server.route('/clientes')
  .get((req, res) => res.send('Lista de Clientes'))
  .post((req, res) => {
      console.log(res)
      res.send({a: 'aaaaaa', b: 'bbbb'})
  })
  .put((req, res) => res.send('Altera Cliente'))
  .delete((req, res) => res.send('Remove Cliente')) 

server.listen(3000, () => console.log('Executando...'))
