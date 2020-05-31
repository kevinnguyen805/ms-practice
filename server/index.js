// first import nodemon, express

require('dotenv').config()

const express = require('express')
const server = express() 
server.use(cors())

const twilio = require('twilio')
const accountSid = ''
const authToken = ''
const client = new Twilio(accountSid, authToken)

client.messages.create({
     body:"Hello from Node", 
     to: '', 
     from: ''
}).then((message) => console.log(message.sid))

server.get('/', (req, res) => {
     console.log(req)

     // TODO - *CREATE* method is nested within the endpoint 
     client.messages.create({
     body:"Hello from Node", 
     to: '', 
     from: ''
     }).then((message) => console.log(message.sid))
})


let port = process.env.PORT || 4000 
server.listen(port, () => {
     console.log(`Server is listening on port ${port}`)
})


