import articleMod from '../../models/articleMod/article';

const api = async (ctx, next) => {
    const res = await articleMod.findAll({
        attributes: ['aid', 'type', 'title', 'text', 'poster', 'likeNum', 'readNum', 'updatedAt'],
        where: {
            uid: ctx.token.uid
        }
    });
    ctx.success(res);
};

export default api;
