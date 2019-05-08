const api = async (ctx, next) => {
    ctx.success({
        city: '深圳',
        date: '1',
        high: '2',
        fx: '3',
        low: '4'
    });
}

export default api;
