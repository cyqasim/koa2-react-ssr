import Sequelize from 'sequelize';
import db from '../db/db';
// 模型 创建模型映射数据表  通过方法初始化自动加上createdAt、updatedAt、version
function creatModal(name, attributes) {
    let attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    // 创建模型
    return db.define(name, attrs, {
        // 映射表名
        tableName: name,
        timestamps: false,
        // 生命周期钩子
        hooks: {
            // 验证前执行
            beforeValidate: function(obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    // 修改表自动增加版本号
                    obj.version++;
                }
            }
        }
    });
}

export default creatModal;
