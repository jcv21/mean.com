var express = require('express');
var router = express.Router();
const mainController = require('../controllers/main.controller');

//HTTP Verbs: POST, GET, PUT, DELETE

function notFound(req, res){
    res.status(400);
    res.send('Not valid endpoint.');
}

//Post  /api/providers
router.post('/providers', mainController.create);

//Get  /api/providers
router.get('/providers', mainController.readAll);

//Get One  /api/providers/123
router.get('/providers/:id', mainController.readOne);

//Put  /api/providers/123
router.put('/providers/:id', mainController.update);

//Delete one provider  /api/providers/123
router.delete('/providers/:id', mainController.deleteOne);

//Delete all providers
router.delete('/providers', mainController.deleteAll);

//No matching api endpoints
router.post('/*', notFound);
router.get('/*', notFound);
router.put('/*', notFound);
router.delete('/*', notFound);



module.exports = router;