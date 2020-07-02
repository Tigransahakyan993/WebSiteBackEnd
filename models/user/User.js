const {Model, DataTypes} = require('sequelize');
const {sequelize} = require('../../connection');

class Users extends Model {}

Users.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING,allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING(12), allowNull: false}
}, { sequelize, modelName: 'users' });


module.exports = Users;