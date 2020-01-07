import userMod from '../../models/userMod/user';
import { StrUtil } from '../../../client/lib/public';
import jwt from 'jsonwebtoken';

const api = async (ctx, next) => {
    const { profile, username, password, phone, sex, age, address, email } = ctx.request.body;
    let _profile = profile;
    if (StrUtil.isEmpty(profile)) {
        _profile = 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1006755054,1072635634&fm=26&gp=0.jpg';
    }
    if (StrUtil.isEmpty(username)) {
        ctx.failure('用户名不能为空');
    } else if (username.length < 4 || username.length > 16) {
        ctx.failure('用户名长度需为4-16位字符');
    } else if (StrUtil.isEmpty(password)) {
        ctx.failure('密码不能为空');
    } else if (password.length < 8 || password.length > 16) {
        ctx.failure('密码长度需为8-16为字母');
    } else if (StrUtil.isEmpty(phone)) {
        ctx.failure('联系方式不能为空');
    } else if (StrUtil.isPhone(phone)) {
        ctx.failure('无效的联系方式');
    } else if (StrUtil.isEmpty(sex) || sex !== 'man' || sex !== 'woman') {
        ctx.failure('请选择性别');
    } else if (StrUtil.isEmpty(age) || typeof age !== 'number') {
        ctx.failure('请选择年龄');
    } else if (StrUtil.isEmpty(address)) {
        ctx.failure('请选择所在地');
    } else if (StrUtil.isEmpty(email)) {
        ctx.failure('邮箱地址不能为空');
    } else if (StrUtil.isEmail(email)) {
        ctx.failure('无效的邮箱地址');
    }
    // 查询是否已存在数据库
    const data = await userMod.findOne({
        where: {
            username: username
        }
    });

    if (data === null) {
        const uid = StrUtil.uuid('u_');
        // 写入数据表
        await userMod.create({
            uid,
            profile: _profile,
            username,
            password,
            phone,
            sex,
            age,
            address,
            email
        });

        const token = jwt.sign(
            {
                createTime: new Date().getTime(),
                username,
                uid
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
        ctx.cookies.set('user_name', username, {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 60 * 60 * 24 * 1000, // cookie有效时长
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });
        ctx.cookies.set('user_profile', _profile, {
            domain: 'localhost', // 写cookie所在的域名
            path: '/', // 写cookie所在的路径
            maxAge: 60 * 60 * 24 * 1000, // cookie有效时长
            httpOnly: false, // 是否只用于http请求中获取
            overwrite: false // 是否允许重写
        });

        ctx.success({ token, username, profile: _profile }, '注册成功');
    } else {
        ctx.failure('用户名已存在');
    }
};

export default api;
