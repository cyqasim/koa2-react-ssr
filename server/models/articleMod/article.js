import Sequelize from 'sequelize';
import creatModal from '../creatModal';

// 创建模型
const articleModal = creatModal('article', {
    aid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
    },
    type: Sequelize.STRING(32),
    title: Sequelize.STRING(32),
    text: Sequelize.STRING(100),
    content: Sequelize.TEXT,
    uid: Sequelize.STRING(50),
    author: Sequelize.STRING(32),
    readNum: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        },
        defaultValue: 0
    },
    likeNum: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true
        },
        defaultValue: 0
    },
    poster: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
    }
});
module.exports = articleModal;
