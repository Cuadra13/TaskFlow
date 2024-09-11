const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/TaskFlow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error al conectar MongoDB:', err));

  
// Definir rutas
app.use('/api/users', require('./routes/users'));
const tasks = require('./Routes/Tasks');


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const cors = require('cors');
app.use(cors());  // Habilita CORS para todas las rutas
