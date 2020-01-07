import articleMod from '../../models/articleMod/article';

const api = async (ctx, next) => {
    const { page, pageSize } = ctx.request.query;
    const _page = parseInt(page) || 1;
    const _pageSize = parseInt(pageSize) || 10;
    const res = await articleMod.findAll({
        attributes: ['aid', 'type', 'title', 'text', 'author', 'poster', 'likeNum', 'readNum', 'updatedAt'],
        offset: (_page - 1) * _pageSize,
        limit: _pageSize
    });

    ctx.success(res);
};

export default api;
