var express = require('express');
var router = express.Router()

router.get('/get/:id', function(req, res){
    let id = req.params.id
    let query = "SELECT * FROM notifikasi_customer WHERE id_akun_customer="+id+" ORDER BY id_notifikasi_customer DESC";
    
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Notifications",
                "items": result
            }
            res.send(data);
        }
    })
    
})

router.get('/read/:id', function(req, res){
    let id = req.params.id
    let query = "UPDATE notifikasi_customer SET status=0 WHERE id_notifikasi_customer="+id;
    
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Notifications",
                "items": result
            }
            res.send(data);
        }
    })
    
})

router.post('/add', function(req, res){
    let id = req.body.id_customer
    let judul = req.body.judul
    let pesan = req.body.pesan
    let query = "INSERT INTO notifikasi_customer (id_akun_customer, judul, pesan, tanggal_notifikasi, status) VALUES("+
                +id+", '"+judul+"', '"+pesan+"', CURTIME(), 1)";
    
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Notifications",
                "items": result
            }
            res.send(data);
        }
    })
    
})

module.exports = router;