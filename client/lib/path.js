const port = process.env.PORT;
const host = process.env.IP;
/**
 * 全局 环境地址
 */
let path = {};
if (process.env.NODE_ENV === 'development') {
    path.baseUrl = `http://${host}:${port}`
} else {
    path.baseUrl = `http://${host}:${port}`
}
export default path;
