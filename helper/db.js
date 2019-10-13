const sql = require('mssql');
const responseModel = require('../model/sqlResponse');

const config = {
    user: 'u8810488_gymcomp',
    password: 'LEvent139200.',
    server: '94.73.146.5',
    database: 'u8810488_gymcomp',
    options: {
        encrypt: false, // Use this if you're on Windows Azure
        Trusted_Connection: false
    },

    beforeConnect: conn => {
        conn.once('connect', err => {
            if (err)
                console.log(err);
            else {
                console.log('Sql Server Connected');
            }
        });
    }
};

module.exports = function (query, requestHeader) {
    //Mssql de bağlantı havuzu açarak bağlantı hata var mı denetliyoruz.
    return new Promise((resolve, reject) => {
        const pool1 = new sql.ConnectionPool(config, function (err) {
            if (err) {
                //res.send("Veritabanına bağlanma konusunda bir hata aldık! :-| " + err);
                responseModel.statusCode = 500;
                responseModel.message = "Veritabanına bağlanma konusunda bir hata aldık! :-| " + err;
                responseModel.result = false;
                reject(responseModel);
            }
            else {
                // Request nesnesi oluşturma kısmı
                var request = new sql.Request(pool1);
                // Veritabanında yapılacak sorgunun işlenmesi ve dönecek cevabın döndürülmesi 
                request.query(query, function (err, recordset) {
                    if (err) {
                        console.log("Error querying database :-|" + err);
                        //res.send(404, err);
                        responseModel.statusCode = 404;
                        responseModel.message = "Error querying database :-|" + err;
                        responseModel.result = false;
                        reject(responseModel);
                    }
                    else {
                        switch (requestHeader) {
                            case "GET":
                                //res.status(200).send(recordset["recordset"]);
                                responseModel.statusCode = 200;
                                responseModel.message = "OK";
                                responseModel.result = true;
                                responseModel.response = recordset["recordset"];
                                break;
                            case "INSERT":
                                //res.status(200).send("OK"); 
                                responseModel.statusCode = 200;
                                responseModel.message = "OK";
                                responseModel.result = true;
                                break;
                            case "UPDATE":
                                //res.status(200).send("OK"); 
                                responseModel.statusCode = 200;
                                responseModel.message = "OK";
                                responseModel.result = true;
                                break;
                            case "DELETE":
                                //res.status(200).send("OK"); break;
                                responseModel.statusCode = 200;
                                responseModel.message = "OK";
                                responseModel.result = true;
                            default:
                                //res.status(404);
                                responseModel.statusCode = 404;
                                responseModel.message = "Not Found";
                                responseModel.result = false;
                        }
                        resolve(responseModel);
                    }
                });
            }
        });
    });

}



