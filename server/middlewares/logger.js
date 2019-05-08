const logger = async (ctx, next) => {
        const now = new Date();
        await next();
        const ms = new Date() - now;
        console.log(`[${ctx.method}][${ms}ms] ${ctx.path}`);
}

module.exports = logger;
