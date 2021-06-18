var mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    urlImagen: String,
    comercios: Array
});

module.exports = mongoose.model('categorias', esquema);