import Sequelize from 'sequelize';
import creatModal from '../creatModal';

// 创建模型
const userModal = creatModal('users', {
    uid: Sequelize.STRING(50),
    username: Sequelize.STRING(100),
    password: Sequelize.STRING(10)
});
module.exports = userModal;
