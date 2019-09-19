var express = require('express');
var router = express.Router();
var user = require('../model/user');
var pool = require('../helper/db');
const sql = require('mssql')


router.post('/', (req, res, next) => {

  console.log(req.body);
  user = req.body;
  pool.then((p) => {
    p.request()
      .input('Name', req.body.Name)
      .input('Surname', req.body.Surname)
      .input('Username', req.body.Username)
      .input('Password', req.body.Password)
      .input('Email', req.body.Email)
      .input('Phone', req.body.Phone)
      .input('Province', req.body.Province)
      .input('District', req.body.District)
      .input('BirthDate', req.body.BirthDate)
      .query("insert into Users (Name,Surname,Username,Password,Phone,Email,Province,District,BirthDate) values (@Name,@Surname,@Username,@Password,@Email,@Phone,@Province,@District,@BirthDate)").then(result => {
        pool.then((p) => {
          p.request().query("select * from Users");
        }).then(result => {
          res.status(200).json(result["recordset"]);
        });
      }).catch(err => {
        console.log(err);
      });
  });
});

module.exports = router;
