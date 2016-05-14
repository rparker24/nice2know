var express = require('express');
var router = express.Router();
var Fact = require('../models/Fact.js');

router.get('/', function(req,res) {
    res.redirect('/facts')
});

router.get('/facts', function(req,res) {

    Fact.findAll({}).then(function(result){
        var hbsObject = {fact : result}
            res.render('index', hbsObject);
    })
});

router.post('/facts/create', function(req,res) {
    Fact.create({
        fact: req.body.name,
            topic: req.body.topic }).then(function(result){
                res.redirect('/facts');
                
    });
});

router.put('/facts/update/:id', function(req,res) {
    Fact.update({
        devoured: req.body.topic
  },
  {
        where: { id : req.params.id }
    }
        ).then(function (result) {
            res.redirect('/facts');
  },    
        function(rejectedPromiseError){
            console.log(rejectedPromiseError);
    });
});

router.delete('/facts/delete/:id', function(req,res) {
    Fact.destroy({
        where: { id : req.params.id }
            }).then(function (result) {
                res.redirect('/facts');
    },    
        function(rejectedPromiseError){
            console.log(rejectedPromiseError);
    });
});

module.exports = router;