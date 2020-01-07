import userMod from '../../models/userMod/user';
import { StrUtil } from '../../../client/lib/public';

const api = async (ctx, next) => {
    const { username } = ctx.request.query;
    if (StrUtil.isEmpty(username)) {
        ctx.failure('用户名不能为空');
    }
    // 查询是否已存在数据库
    const user = await userMod.findOne({
        where: {
            username: username
        }
    });

    if (user === null) {
        ctx.success();
    } else {
        ctx.failure('用户名已存在');
    }
};

export default api;
