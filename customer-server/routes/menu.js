var express = require('express');
var router = express.Router()

router.get('/', function(req, res){
    let query = "SELECT * FROM menu";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Menu",
                "items": result
            }
            res.send(data);
        }
    })
    
})

router.get('/order', function(req, res){
    let query = "SELECT * FROM menu ORDER BY jumlah_pemesan DESC";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Menu",
                "items": result
            }
            res.send(data);
        }
    })
    
})

module.exports = router;