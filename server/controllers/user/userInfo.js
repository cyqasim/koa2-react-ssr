import userMod from '../../models/userMod/user';

const api = async (ctx, next) => {
    const user = await userMod.findOne({
        where: {
            username: ctx.token.username
        }
    });
    const res = {
        profile: user.profile,
        username: user.username,
        sex: user.sex,
        age: user.age,
        phone: user.phone,
        address: user.address,
        email: user.email,
        createTime: user.createdAt
    };
    ctx.success(res);
};

export default api;
