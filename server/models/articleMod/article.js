import Sequelize from 'sequelize';
import creatModal from '../creatModal';

// 创建模型
const articleModal = creatModal('article', {
    aid: Sequelize.STRING(50),
    date: Sequelize.BIGINT,
    text: Sequelize.TEXT,
    author: Sequelize.STRING(10)
});
module.exports = articleModal;
