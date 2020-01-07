import articleMod from '../../models/articleMod/article';
import { StrUtil } from '../../../client/lib/public';

const api = async (ctx, next) => {
    const { type, title, text, content, poster } = ctx.request.body;
    let _poster = poster;
    const aid = StrUtil.uuid();
    if (!_poster) {
        _poster =
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563959341562&di=3e44184b227d2277a8edfcd6c17d162d&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F47%2F26%2F835743e2ba5da85.jpg';
    }

    // 写入数据表
    await articleMod.create({
        aid,
        type,
        title,
        text,
        content,
        poster: _poster,
        uid: ctx.token.uid,
        author: ctx.token.username
    });

    ctx.success({ aid }, '保存成功');
};

export default api;
