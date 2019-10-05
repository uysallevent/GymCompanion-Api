const sql = require('mssql');

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

module.exports = function (res, query, requestHeader) {
    //Mssql de bağlantı havuzu açarak bağlantı hata var mı denetliyoruz.
    const pool1 = new sql.ConnectionPool(config, function (err) {
        if (err) {
            res.send("Veritabanına bağlanma konusunda bir hata aldık! :-| " + err);
        }
        else {
            // Request nesnesi oluşturma kısmı
            var request = new sql.Request(pool1);
            // Veritabanında yapılacak sorgunun işlenmesi ve dönecek cevabın döndürülmesi 
            request.query(query, function (err, recordset) {
                if (err) {
                    console.log("Error querying database :-|" + err);
                    res.send(404, err);
                }
                else {
                    switch (requestHeader) {
                        case "GET":
                            res.status(200).send(recordset["recordset"]); break;
                        case "INSERT":
                            res.status(200).send("OK"); break;
                        case "UPDATE":
                            res.status(200).send("OK"); break;
                        case "DELETE":
                            res.status(200).send("OK"); break;
                        default:
                            res.status(404);
                    }
                }
            });
        }
    });
}


//module.exports = new sql.ConnectionPool(config).connect();

