var express = require('express');
var router = express.Router();
var categoria = require('../models/categoria');
var mongoose = require('mongoose');

/////////////////////////////////////////////////////////
//----CRUD CATEGORIAS
//----CREAR CATEGORIA
router.post('/', (req, res) => {
    let u = new categoria({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        urlImagen: req.body.urlImagen,
        comercios: []
    })
    u.save().then((res2) => {
        res.json(res2);
        res.end();
    })
})

//----LEER CATEGORIAS

router.get('/', (req, res) => {
    categoria.find().then(result => {
        res.json(result);
    })
})






///////////////////////////////////////////////////////
//----CRUD COMERCIOS
//----CREAR COMERCIO
router.post('/:idCategoria/comercios', (req, res) => {
    categoria.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCategoria)
    }, {
        $push: {
            comercios: {
                _id: mongoose.Types.ObjectId(),
                nombre: req.body.nombre,
                urlImagen: req.body.imagen,
                logo: req.body.logo,
                descripcion: req.body.descripcion,
                productos: []
            }
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
})

//----LEERCOMERCIOS

router.get('/comercios/:idCategoria', (req, res) => {
    categoria.find({ _id: mongoose.Types.ObjectId(req.params.idCategoria) })
        .then(result => {
            res.json(result[0].comercios);
        })
})

/////////////////////////////////////////////////////////////////////////
//----CRUD PRODUCTOS
//----LEER PRODUCTOS
router.get('/:idCategoria/productos/:idEmpresa', (req, res) => {
    categoria.find({
            _id: req.params.idCategoria,
            "comercios._id": mongoose.Types.ObjectId(req.params.idEmpresa)
        }, { "comercios.$": true })
        .then(result => {
            res.json(result[0].comercios);
        })
        .catch()
})

//----CREAR PRODUCTO

router.post('/:idCategoria/productos/:idComercio', (req, res) => {
    categoria.updateOne({
        _id: mongoose.Types.ObjectId(req.params.idCategoria),
        "comercios._id": mongoose.Types.ObjectId(req.params.idComercio)
    }, {
        $push: {
            "comercios.$.productos": {
                _id: mongoose.Types.ObjectId(),
                imagen: req.body.imagen,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
            }
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })

})

//----------------------------------------------------------------------------------
module.exports = router;