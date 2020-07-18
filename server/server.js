const path = require('path')
const express = require('express')
const http = require('http')
const sockets = require('socket.io')

const app = express()
const server = http.Server(app)
const io = sockets(server)

app.use(express.json())
app.use(express.static(path.join(__dirname, './public')))


/*

SOCKETS
    io.to(socket.id).emit('sup ')
    io.emit('welcome')
    socket.emit('hi')
    socket.broadcast.emit('roomleave', socket.id)
    io.to(room).emit('newlobbymemeber', socket.nickname)
    socket.join(room)
    io.in(room).clients((err , clients) => {})
    socket.nickname = nickname

    socket - goes back to the same client
    io - goes to all clients
    .emit - sends event
    .join(some string) - socket joins a "room" with other sockets if they use the same string
    .to(socket.id) - sends to a specific client (maybe not this one)
    .to(room) - sends to all in a room
    socket.broadcast.emit - sending to all clients except sender

*/

io.on('connection', socket => {
    console.log(socket.id, 'connected')

    socket.on('play', () => {
        console.log('play')
        io.emit('play')
    })

    socket.on('pause', () => {
        console.log('pause')
        io.emit('pause')
    })

    socket.on('set name', name => {
        socket.name = name
        console.log(`set ${socket.id}'s name to ${name}`)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
        socket.broadcast.emit('roomleave', socket.id)
    })
})

module.exports = server
