var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

let bd = 'platam';
let port = '27017';
let host = 'localhost';
let url = `mongodb://${host}:${port}/${bd}`;

class Database {
    constructor() {
        this.conectar();
    }
    conectar() {
        mongoose.connect(url)
            .then(result => console.log('-------------Se conecto a mongodb------------------'))
            .catch(error => console.log(error));
    }
}

module.exports = new Database();