/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const redis = require('redis');
const sequelize = require('../../db/connect');

const ArticleCategory = sequelize.define('articleCategories', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    description: {
        type: DataTypes.STRING,
    },
});

ArticleCategory.afterCreate(async () => {
    const redisClient = redis.createClient({ url: 'redis://redis:6379' });
    await redisClient.connect();
    await redisClient.del('articleCategoryData');
});

ArticleCategory.afterUpdate(async () => {
    const redisClient = redis.createClient({ url: 'redis://redis:6379' });
    await redisClient.connect();
    await redisClient.del('articleCategoryData');
});

// (async () => {
//   await sequelize.sync();
//   console.log('Appointments D Table synced successfully');
// })();

module.exports = ArticleCategory;
