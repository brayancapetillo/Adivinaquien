const mysql = require('mysql');

const { promisify } = require('util');



const  database  ={

    host: 'localhost',

    port: 3306,

    user: 'brayan',

    password: '250214',

    database: 'adivinaquien'

} ;



const pool = mysql.createPool(database);



pool.getConnection((err, connection) => {

    if (err) {

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {

            console.error('DATABASE CONNECTION WAS CLOSED');

        }

        if (err.code === 'ER_CON_COUNT_ERROR') {

            console.error('DATABASE HAS TO MANY CONNECTIONS');

        }

        if (err.code === 'ECONNREFUSED') {

            console.error('DATABASE CONNECTION WAS REFUSED');

        }

    }

   

    if (connection){

        connection.release();

        console.log('DB is connected');

    }else{
        console.log("puto");
    }

   



    return;

});



// Promisify Pool Query

pool.query = promisify(pool.query);



module.exports = pool;