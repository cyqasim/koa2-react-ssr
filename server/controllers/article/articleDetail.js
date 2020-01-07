import articleMod from '../../models/articleMod/article';

const api = async (ctx, next) => {
    const { aid } = ctx.request.query;
    let res = await articleMod.findOne({
        attributes: ['type', 'title', 'text', 'content', 'author', 'likeNum', 'readNum', 'updatedAt'],
        where: {
            aid
        }
    });
    ctx.success(res);
};

export default api;
