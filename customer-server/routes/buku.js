var express = require('express');
var router = express.Router()

router.get('/', function(req, res){
    let query = "SELECT * FROM pelanggan";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    })
    
})

router.get('/add/:email/:password/:name', function(req, res){
    email = req.params.email
    password = req.params.password
    name = req.params.name
    let query = "INSERT INTO pelanggan (email, password, name) VALUES('"+email+"','"+password+"','"+name+"')";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    })
    
})

router.get('/select/:id', function(req, res){
    id = req.params.id
    let query = "SELECT * FROM pelanggan WHERE id_pelanggan='"+id+"'";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    })
    
})

router.get('/delete/:id', function(req, res){
    id = req.params.id
    let query = "DELETE FROM pelanggan WHERE id_pelanggan='"+id+"'";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            res.send(result);
        }
    })
    
})

module.exports = router;