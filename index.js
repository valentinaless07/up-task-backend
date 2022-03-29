// const express = require('express'); 
// cambio de sintaxis type module
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

import express from 'express'
import dotenv from 'dotenv'
import conectarDb from './config/db.js'
import cors from 'cors'

const app = express()
app.use(express.json())

dotenv.config()


conectarDb()

// CORS
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.includes(origin)){
            // Permitido
            callback(null, true)
        }
        else{
            // No permitido
            callback(new Error("Error de cons"))
        }
    }
}

app.use(cors(corsOptions))

// Routing

app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)


const PORT = process.env.PORT || 4000

const servidor = app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})

//Socket Io

import { Server } from 'socket.io'

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_URL
    }
})

io.on("connection", (socket) => {
    console.log('Conectando a socket io')
})