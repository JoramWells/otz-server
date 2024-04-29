/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const redis = require('redis');
const sequelize = require('../../db/connect');
const User = require('../users/user.models');
const ArticleCategory = require('./articleCategory.model');

const Article = sequelize.define('articles', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  articleCategoryID: {
    type: DataTypes.UUID,
    references: {
      model: 'articleCategories',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  description: {
    type: DataTypes.STRING,
  },
});

Article.belongsTo(User, { foreignKey: 'userID', targetKey: 'id' });
Article.belongsTo(ArticleCategory, { foreignKey: 'articleCategoryID', targetKey: 'id' });

Article.afterCreate(async () => {
  const redisClient = redis.createClient({ url: 'redis://redis:6379' });
  await redisClient.connect();
  await redisClient.del('articleData');
});

Article.afterUpdate(async () => {
  const redisClient = redis.createClient({ url: 'redis://redis:6379' });
  await redisClient.connect();
  await redisClient.del('articleData');
});

// (async () => {
//   await sequelize.sync();
//   console.log('Appointments D Table synced successfully');
// })();

module.exports = Article;
