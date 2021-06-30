var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    contrasena: String,
    tipoUsuario: Number,
    pedidos: Array
});

module.exports = mongoose.model('usuarios', esquema);