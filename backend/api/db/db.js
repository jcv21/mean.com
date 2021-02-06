const mongoose = require('mongoose');
const {Provider} = require('../models/provider');

// Connection URI to MongoDB
const uri = 'mongodb://localhost:27017/provider_db';

// Make db connection (asychronously)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then( result => {
        console.log('Successful Connection!')
    })
    .catch( error => console.log(error));


module.exports = Provider;