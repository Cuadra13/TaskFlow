// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/taskManagementApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/projects', require('./Routes/Projects'));
app.use('/api/tasks', require('./Routes/Tasks'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

