const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['accesstoken'] || req.body.token || req.query.token

    if (token) {
        jwt.verify(token, 'gymcompanion', (err, decode) => {
            if (err) {
                res.json({
                    "statusCode": 200,
                    "result": false,
                    "message": "Failed to authenticate token"
                })
            }
            else {
                req.decode = decode;
                console.log(decode);
                next();
            }
        });
    }
    else {
        res.json({
            "statusCode": 200,
            "result": false,
            "message": "Accesstoken Not Found"
        });
    }
};