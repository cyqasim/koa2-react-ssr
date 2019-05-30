import Sequelize from 'sequelize';
import dbConfig from './dbConfig';

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    dialectOptions: {
        socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    }
});

export default db;
