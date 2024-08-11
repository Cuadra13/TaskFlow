const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/nombre_de_tu_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Error al conectar MongoDB:', err));

// Definir rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
