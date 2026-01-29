const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false },
});

Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post);

module.exports = Comment;
