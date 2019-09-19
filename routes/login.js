const user = require('../model/user');
const db = require('../helper/db');
const express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
    db.then(x => {
        return x.request().query("select * from Users where Username='" + req.body.Username + "' and Password='" + req.body.Password + "'")
    }).then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;