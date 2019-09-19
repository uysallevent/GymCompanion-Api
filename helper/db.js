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
            else
            {
                console.log('Connected');
            }
        });
    }
};


module.exports = sql.connect(config);

