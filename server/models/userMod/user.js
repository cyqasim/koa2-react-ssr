import Sequelize from 'sequelize';
import creatModal from '../creatModal';

// 创建模型
const userModal = creatModal('users', {
    uid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(50)
    },
    profile: Sequelize.STRING(250),
    username: Sequelize.STRING(32),
    password: Sequelize.STRING(32),
    phone: Sequelize.CHAR(11),
    sex: Sequelize.CHAR(10),
    age: {
        type: Sequelize.INTEGER,
        validate: {
            isNumeric: true,
            notNull: true
        }
    },
    address: Sequelize.STRING(50),
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    }
});
module.exports = userModal;
