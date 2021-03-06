const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use;

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: '404 not found...' });
});


// const dbURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/NewWaveDBTest' : 'mongodb+srv://yoell:buMqJdWA8zSdG5D@cluster0.8qbld.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connect('mongodb+srv://yoell:buMqJdWA8zSdG5D@cluster0.8qbld.mongodb.net/NewWaveDB?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000')
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New socket ', socket.id);
});

module.exports = server;