const user = require('../model/user');
const db = require('../helper/db');
const express = require('express');
const bcrypt=require('bcrypt');
var router = express.Router();

router.get('/', (req, res, next) => {

    db(res,"select * from Users","GET");
});




module.exports = router;