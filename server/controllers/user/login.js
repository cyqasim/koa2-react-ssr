import userMod from '../../models/userMod/user';
import { generateId } from '../../lib/tools';

const api = async (ctx, next) => {
    console.log(ctx.request.body);
    const { username, password } = ctx.request.body;
    if (!username) {
        ctx.failure('用户名不能为空');
    }
    if (!password) {
        ctx.failure('密码不能为空');
    }
    // 查询是否已存在数据库
    const data = await userMod.findOne({
        where: {
            username: username
        }
    });

    if (data === null) {
        // 生成随机id
        const id = generateId();
        // 写入数据表
        await userMod.create({
            uid: id,
            username: username,
            password: password
        });
        ctx.success({}, '注册成功');
    } else {
        ctx.failure('用户名已存在');
    }
};

export default api;
