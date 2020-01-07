import userMod from '../../models/userMod/user';
import jwt from 'jsonwebtoken';

const api = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    console.log('xxxkkk');
    if (!username) {
        ctx.failure('用户名不能为空');
    }
    if (!password) {
        ctx.failure('密码不能为空');
    }
    const user = await userMod.findOne({
        where: {
            username: username
        }
    });

    if (user) {
        // 检查密码
        if (user.password === password) {
            const token = jwt.sign(
                {
                    createTime: new Date().getTime(),
                    username: user.username,
                    uid: user.uid
                },
                'user_token',
                { expiresIn: 60 * 60 * 24 }
            );
            ctx.cookies.set('user_token', token, {
                domain: 'localhost', // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                maxAge: 60 * 60 * 24 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            });
            ctx.cookies.set('user_name', user.username, {
                domain: 'localhost', // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                maxAge: 60 * 60 * 24 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            });
            ctx.cookies.set('user_profile', user.profile, {
                domain: 'localhost', // 写cookie所在的域名
                path: '/', // 写cookie所在的路径
                maxAge: 60 * 60 * 24 * 1000, // cookie有效时长
                httpOnly: false, // 是否只用于http请求中获取
                overwrite: false // 是否允许重写
            });
            ctx.success({ token, username: user.username, profile: user.profile }, '登录成功');
        } else {
            ctx.failure('密码不正确');
        }
    } else {
        ctx.failure('用户名不存在');
    }
};

export default api;
