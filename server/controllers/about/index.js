const api = async (ctx, next) => {
    ctx.success({
        city: '北京',
        date: '12',
        high: '34',
        fx:  '56',
        low: '78'
    });
}

export default api;
