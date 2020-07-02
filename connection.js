const mysql = require('mysql');
const Sequelize = require('sequelize');

const config = {
    host: 'localhost',
    user: 'root',
    password: '534442',
    database: 'mynewdb',
};

    const db = mysql.createConnection(config);

    db.connect((err) => {
        if (err) {
            console.log('error', err)
        } else {
            console.log('MySQL connected');
        }
    });

const sequelize = new Sequelize('mynewdb','root','534442',{
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = {db, sequelize};
