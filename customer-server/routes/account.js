var express = require('express');
var router = express.Router();

const crypto = require('crypto');
const algorithm = 'aes-128-cbc';
const key = 'sidelearnIF40-05';

function encrypt(plaintext){
    var ciphertext = crypto.createCipher(algorithm, key)
    var crypted = ciphertext.update(plaintext,'utf8','hex')
    crypted += ciphertext.final('hex');
    return crypted
}

function decrypt(ciphertext){
    var plaintext = crypto.createDecipher(algorithm, key)
    var crypted = plaintext.update(ciphertext,'hex','utf8')
    crypted += plaintext.final('utf8');
    return crypted
}

router.get('/', function(req, res){
    let query = "SELECT username FROM akun_customer";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Account",
                "items": result
            }
            res.send(data);
        }
    })
})

router.get('/saldo/:id', function(req, res){
    let id = req.params.id
    let query = "SELECT * FROM saldo WHERE id_akun_customer="+id;
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Saldo",
                "items": result
            }
            res.send(data);
        }
    })
})

router.post('/saldo/update', function(req, res){
    let id = req.body.id_customer
    let saldo = req.body.saldo
    let query = "UPDATE saldo SET saldo="+saldo+" WHERE id_akun_customer="+id;
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Saldo",
                "items": result
            }
            res.send(data);
        }
    })
})

router.post('/saldo/log', function(req, res){
    let id_saldo = req.body.id_saldo
    let id_transaksi = req.body.id_transaksi
    let query = "INSERT INTO log_saldo (id_saldo, id_transaksi_order, tipe_log_saldo) VALUES("+id_saldo+", "+id_transaksi+", 'outcome')";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Saldo",
                "items": result
            }
            res.send(data);
        }
    })
})

router.get('/get/:username', function(req, res){
    let username = req.params.username
    let query = "SELECT id_akun_customer, username, no_hp, last_login, status_tcash FROM akun_customer WHERE username ='"+username+"'";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Account",
                "items": result
            }
            console.log(data)
            res.send(data);
        }
    })
})



router.get('/lastlogin/:username', function(req, res){
    let username = req.params.username
    let query = "UPDATE akun_customer SET last_login=CURTIME() WHERE username ='"+username+"'";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            console.log("last logged in")
            console.log(result)
            
        }
    })
})


router.post('/login', function(req, res){
    let username = req.body.username
    let password = encrypt(req.body.password)
    let query = "SELECT * FROM akun_customer WHERE username ='"+username+"' AND password='"+password+"'";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Account",
                "items": result
            }
            res.send(data);
            console.log(username+" try to log in")
        }
    })
})


router.post('/regist', function(req, res){
    let username = req.body.username
    let password = encrypt(req.body.password)
    let no_hp = req.body.no_hp
    let query = "INSERT INTO `akun_customer` (username, password, no_hp) VALUES ('"
                +username+"', '"
                +password+"', '"
                +no_hp+"');";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Account",
                "items": result
            }
            res.send(data);                    
            console.log(username+" try to regist")
            console.log(data);
        }
    })
})

router.post('/password/change', function(req, res){
    let username = req.body.username
    let password = encrypt(req.body.password)
    let query = "UPDATE `akun_customer` SET password='"
                +password+"' WHERE username='"+username+"'";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Account",
                "items": result
            }
            res.send(data);                    
            console.log(username+" try to change password")
            console.log(data);
        }
    })
})

router.get('/encrypt/:plaintext', function(req, res){
    var plaintext = req.params.plaintext
    var ciphertext = encrypt(plaintext)
    res.send({'key': key, 'plaintext': plaintext, 'ciphertext': ciphertext})
})

router.get('/decrypt/:ciphertext', function(req, res){
    var ciphertext = req.params.ciphertext
    var plaintext = decrypt(ciphertext)
    res.send({'key': key, 'ciphertext': ciphertext, 'plaintext': plaintext})
})

module.exports = router;