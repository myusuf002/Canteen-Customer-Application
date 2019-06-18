var express = require('express');
var router = express.Router()


router.get('/get/:id', function(req, res){
    let id = req.params.id
    let query = "SELECT * FROM `order` WHERE id_akun_customer="+id+" ORDER BY id_order DESC";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Order",
                "items": result
            }
            res.send(data);
        }
    })
    
})

router.get('/limit/:id', function(req, res){
    let id = req.params.id
    let query = "SELECT * FROM `order` WHERE id_akun_customer="+id+" ORDER BY id_order DESC limit 3";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Order",
                "items": result
            }
            res.send(data);
            console.log("Order limit")
        }
    })
    
})

router.post('/add', function(req, res){    
    let id_customer = req.body.id_customer
    let waktu_pengambilan = req.body.pengambilan
    let catatan = req.body.catatan

    let query = "INSERT INTO `order` (id_akun_customer, status_order, waktu_order, waktu_pengambilan, catatan) VALUES ("+id_customer+", 'reserved', CURTIME(), DATE_ADD(CURTIME(), INTERVAL "+waktu_pengambilan+" HOUR), '"+catatan+"');";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Order",
                "items": result
            }
            res.send(data);
            console.log("Order add")
            console.log(data)
        }
    })  
})

router.post('/update', function(req, res){    
    let id_order = req.body.id_order
    let waktu_pengambilan = req.body.pengambilan
    let catatan = req.body.catatan

    let query = "UPDATE `order` SET waktu_order=CURTIME(), waktu_pengambilan=DATE_ADD(CURTIME(), INTERVAL "+waktu_pengambilan+" HOUR), catatan='"+catatan+"' WHERE id_order="+id_order;
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Order",
                "items": result
            }
            res.send(data);
            console.log("Order update")
            console.log(data)
        }
    })  
})

router.post('/detail/add', function(req, res){    
    let id_order = req.body.id_order
    let id_menu = req.body.id_menu
    let qty = req.body.qty
    let query = "INSERT INTO `detail_order` (id_order, id_menu, qty) VALUES ("+id_order+", "+id_menu+", "+qty+")";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Detail Order",
                "items": result
            }
            res.send(data);
            console.log("Detail Order add")
            console.log(data)
        }
    }) 
})

router.get('/detail/remove/:id', function(req, res){
    let id_order = req.params.id
    let query = "DELETE FROM `detail_order` WHERE id_order="+id_order;
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Detail Order",
                "items": result
            }
            res.send(data);
            console.log("Detail Order remove")
            console.log(data)
        }
    }) 
})

module.exports = router;