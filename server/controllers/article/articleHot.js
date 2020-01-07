import articleMod from '../../models/articleMod/article';

const api = async (ctx, next) => {
    const res = await articleMod.findAll({
        attributes: ['aid', 'title', 'text', 'author', 'poster'],
        limit: 5,
        // 排序
        order: [
            // 按点赞数量降序
            ['likeNum', 'DESC']
        ]
    });
    console.log(res);
    ctx.success(res);
};

export default api;
