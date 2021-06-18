var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var categoriaRouter = require('./route/categorias-routes');
var usuariosRouter = require('./route/usuarios-routes');
var Database = require('./moduls/database');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/categorias', categoriaRouter);
app.use('/usuarios', usuariosRouter);



app.get('/', (req, res) => {
    res.send('hi');
})
app.listen(8888, function() {
    console.log('-------------------Se levanto el servidor------------------');
});