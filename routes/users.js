var express = require('express');
var router = express.Router();
var user = require('../model/user');
var pool = require('../helper/db');
const sql = require('mssql');
const bcrypt = require('bcrypt');


router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.Password, 10, (err, hash) => {
    pool(res, `INSERT INTO Users (Name,Surname,Username,Password,Phone,Email,Province,District,BirthDate) VALUES 
    ( '${req.body.Name}',
      '${req.body.Surname}',
      '${req.body.Username}',
      '${hash}',
      '${req.body.Email}',
      '${req.body.Phone}',
      ${req.body.Province},
      ${req.body.District},
      '${req.body.BirthDate}')`, "INSERT");
  });
});

router.post('/login', (req, response, next) => {

  pool(response, `SELECT Password FROM Users WHERE Username='${req.body.Username}'`, 'GET');



  // bcrypt.compare(req.body.Password, hash).then(function (res) {


  // });
});
module.exports = router;
