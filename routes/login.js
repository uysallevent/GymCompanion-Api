const user = require('../model/user');
const pool = require('../helper/db');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();

router.post('/', (req, response, next) => {

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