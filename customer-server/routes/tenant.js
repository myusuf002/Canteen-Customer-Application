var express = require('express');
var router = express.Router()

router.get('/', function(req, res){
    let query = "SELECT * FROM tenant";
    db.query(query, (err, result) => {
        if (err){
            res.send(err)
        }
        else{
            let data = {
                "type": "Data Tenant",
                "items": result
            }
            res.send(data);
        }
    })
    
})

module.exports = router;