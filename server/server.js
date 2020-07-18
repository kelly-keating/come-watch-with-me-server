const path = require('path')
const express = require('express')
const http = require('http')
const sockets = require('socket.io')

const app = express()
const server = http.Server(app)
const io = sockets(server)

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))


io.on('connection', socket => {
    console.log(socket.id, 'connected')

    socket.on('play', () => {
        io.emit('play')
    })

    socket.on('pause', () => {
        io.emit('pause')
    })
})

module.exports = server
