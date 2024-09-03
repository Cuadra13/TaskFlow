const express = require('express');
const router = express.Router();
const User = require('../TaskFlow/Models/User');
const { app } = require('../server');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear un nuevo usuario
        user = new User({ username, email, password });
        await user.save();

        // Generar token JWT
        const token = user.generateAuthToken();

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales incorrectas' });
        }

        // Comparar la contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = user.generateAuthToken();

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;// Definir rutas


