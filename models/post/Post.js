const {sequelize} = require('../../connection')
const {Model, DataTypes} = require('sequelize');

class Posts extends Model {}

Posts.init({
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    post: {type: DataTypes.STRING, allowNull: false},
}, { sequelize, modelName: 'posts' });

module.exports = Posts;