import userMod from '../../models/userMod/user';
import { StrUtil } from '../../../client/lib/public';
import nodemailer from 'nodemailer';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

const api = async (ctx, next) => {
    const { username } = ctx.request.query;
    if (StrUtil.isEmpty(username)) {
        ctx.failure('用户名不能为空');
    }
    // 查询是否已存在数据库
    const data = await userMod.findOne({
        where: {
            username: username
        }
    });

    if (data !== null) {
        let transporter = nodemailer.createTransport({
            // host: 'smtp.qq.email',
            service: 'qq',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: '413239776@qq.com', // generated ethereal user
                pass: 'hqakcxbkulirbhjb' // generated ethereal password
            }
        });

        const template = nunjucks.render(path.resolve('./views/email.html'), { password: data.password });

        const options = {
            from: 'cyqasim<413239776@qq.com>',
            to: 'chenyiqiu@wshifu.com',
            // cc     : ''  //抄送
            // bcc     : ''  //密送
            subject: '「B博客」找回密码',
            text: '「B博客」找回密码',
            html: String(template)
            // attachments: [
            //     {
            //         filename: 'img1.png', // 改成你的附件名
            //         path: 'public/images/img1.png', // 改成你的附件路径
            //         cid: '00000001' // cid可被邮件使用
            //     }
            // ]
        };
        transporter.sendMail(options, function(err, msg) {
            if (err) {
                console.log(err);
            } else {
                console.log(msg);
            }
        });

        ctx.success();
    } else {
        ctx.failure('用户名不存在');
    }
};

export default api;
