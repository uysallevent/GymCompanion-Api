var express = require('express');
var router = express.Router();
var user = require('../model/user');
var responseModel = require('../model/sqlResponse');
var pool = require('../helper/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.Password, 10, (err, hash) => {
    responseModel = pool(`INSERT INTO Users (Name,Surname,Username,Password,Phone,Email,Province,District,BirthDate) VALUES 
    ( '${req.body.Name}',
      '${req.body.Surname}',
      '${req.body.Username}',
      '${hash}',
      '${req.body.Email}',
      '${req.body.Phone}',
      ${req.body.Province},
      ${req.body.District},
      '${req.body.BirthDate}')`, "INSERT")
      .then((result) => {
        console.log(result.result);
        res.json(result);
      }).catch((err) => {
        console.log(err);
        res.json(err);
      });
  })
});

router.post('/login', (req, response, next) => {

  const { Username, Password } = req.body;

  pool(`SELECT * FROM Users WHERE Username='${Username}'`, 'GET')
    .then((result) => {
      if (result.response.length === 0) {
        console.log(result);
        response.json({
          "statusCode": 200,
          "result": false,
          "message": "Kullanıcı Bulunamadı"
        });
      }
      else
        bcrypt.compare(Password, result.response[0].Password).then(function (res) {
          if (res) {

            const payLoad = {
              Username
            };
            const token = jwt.sign(payLoad, 'gymcompanion', { expiresIn: 720 })

            console.log(res);
            response.json({
              "statusCode": 200,
              "result": res,
              "token": token,
              "message": result.response[0]
            });
          }
          else {
            console.log(res);
            response.json({
              "statusCode": 200,
              "result": res,
              "message": "Kullanıcı Bulunamadı"
            });
          }
        });
    }).catch((err) => {
      console.log(err);
      response.json(err);
    });








});
module.exports = router;
