import express from 'express'
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import viewRouters from './routes/views.routes.js'

const app = express()
const PORT = 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine())
app.set('views', 'src/views')
app.set('view engine', 'handlebars')

app.use('/', viewRouters)


const httpServer = app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

const io = new Server(httpServer)

const messages = []

io.on('connect', socket =>{
    console.log('Nuevo cliente conectado')
    socket.on('message', data =>{
        messages.push(data)
        io.emit('messageLogs', messages)
    })
    socket.on('newUser', user =>{
        io.emit('newConnection', 'Un nuevo usuario se conecto')
        socket.broadcast.emit('notification', user)
    })
})