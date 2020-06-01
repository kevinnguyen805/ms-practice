// first import nodemon, express

require('dotenv').config()

const express = require('express')
const server = express() 
const cors = require('cors')
server.use(cors())

const twilio = require('twilio')

const client = new twilio(accountSid, authToken)



server.get('/', (req, res) => {
     //TODO - NOTE THAT THE CONTENT IS RETRIEVE BY QUERY --- not by req.body
     console.log(req.query)

     // TODO - *CREATE* method is nested within the endpoint 
     client.messages.create({
     body:`${req.query.textmessage}`, 
     to: `${req.query.recipient}`, 
     from: '8646687632'
     }).then((message) => res.send(message.sid))
})

server.get('/get-message/:id', (req, res) => {
     // TODO - use /:id and grab ID from req.params and insert to client.message() method 
     //TODO - return the message back to frontend 
     let id = req.params.id

     client.messages(`${id}`)
     .fetch()
     .then((message) => {
          // console.log('success', message.body)
          res.send(message.body)
     })
})



let port = process.env.PORT || 4000 
server.listen(port, () => {
     console.log(`Server is listening on port ${port}`)
})


