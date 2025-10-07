require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const authRouter = require('./routes/auth');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

// http server
const server = http.createServer(app);

//initialiser socket io
const {Server} = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});

app.locals.io = io;

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connecté à MongoDB Atlas'))
    .catch(err => console.error('Erreur de connexion MongoDB:', err));

// les routes API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRouter);

// Socket io connexion
io.on('connection', (socket) => {
    console.log('Nouveau client connecté (socket.id):', socket.id);

    socket.on('disconnect', () => {
        console.log('Client déconnecté (socket.id):', socket.id);
    });
});

// démarrage serveur
server.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`);
});