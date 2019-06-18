var express = require('express');
var router = express.Router()

router.get('/get/:id', function(req, res){
    let id = req.params.id
    let query = "SELECT * FROM transaksi_order WHERE id_akun_customer="+id+" ORDER BY id_transaksi_order DESC";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Payment",
                "items": result
            }
            res.send(data);
        }
    })
    
})

router.get('/limit/:id', function(req, res){
    let id = req.params.id
    let query = "SELECT * FROM transaksi_order WHERE id_akun_customer="+id+" ORDER BY id_transaksi_order DESC limit 3";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Payment",
                "items": result
            }
            res.send(data);
        }
    })
    
})

router.post('/add', function(req, res){    
    let id_order = req.body.id_order
    let id_customer = req.body.id_customer
    let metode = req.body.metode
    let total = req.body.total
    let status = req.body.status

    let query = "INSERT INTO `transaksi_order` (id_order, id_akun_customer, metode_transaksi_order, total_transaksi_order, status_transaksi_order) VALUES ("+id_order+", "+id_customer+", '"+metode+"', "+total+", '"+status+"')"
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Payment",
                "items": result
            }
            res.send(data);
            console.log("Payment add")
            console.log(data)
        }
    })  
})
module.exports = router;