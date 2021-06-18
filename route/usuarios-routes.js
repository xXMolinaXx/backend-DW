var express = require('express');
var router = express.Router();
var usuarios = require('../models/usuario');
var mongoose = require('mongoose');



//-----------------------------------------------------------------------------------agregar un usuarios
router.post('/', (req, res) => {
    let u = new usuarios({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        contrasena: req.body.contrasena
    })
    u.save().then((res2) => {
        res.json(res2);
        res.end();
    })
})

//--------------------------------------------verificar si el usuario existe
router.post('/entrar', (req, res) => {
    usuarios.find({ correo: req.body.correo, contrasena: req.body.contrasena }).then(result => {
        console.log(result)
        if (result[0].correo == req.body.correo) {
            console.log(result[0].correo);
            console.log(result[0].contrasena);
            console.log(req.body.correo);
            res.json({ id: result[0]._id });
        }

    }).catch(error => {
        console.log('error');
        res.json({ id: 'ninguno' })
    })
})

//----------------------------------------------------------------------------------obtener a todos los usuarioss

router.get('/', (req, res) => {
    usuarios.find().then(result => {
        res.json(result);
    })
})

//--------------------------------------------------------------obtener un usuarios

router.get('/:id', (req, res) => {
    usuarios.find({ _id: req.params.id }).then(result => {
        res.json(result);
    })

})

//--------------------------------------------------------------------------actualizar usuarios

router.put('/:id', (req, res) => {
    usuarios.update({
        _id: req.params.id
    }, {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        contrasena: req.body.contrasena
    }).then(res2 => {
        res.json(res2);
    })
})

//----------------------------------------------------------------------------borrar usuarios

router.delete('/:id', (req, res) => {
    usuarios.remove({ _id: req.params.id }).then(res2 => { res.json(res2) });
})

//----------------------------------------------------------------------------------
module.exports = router;