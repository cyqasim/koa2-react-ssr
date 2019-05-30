const fs = require('fs');
const path = require('path');
const modelDir = path.resolve('./server') + '/models';
const modelExt = 'Mod';

function addModels() {
    // 读取文件夹
    fs.readdirSync(modelDir)
        .filter(f => {
            // 判断是否为文件夹并且Api结尾
            const stat = fs.lstatSync(modelDir);
            return stat.isDirectory() && f.endsWith(modelExt);
        })
        .forEach(f => {
            // 遍历分控制器文件夹
            const dir = modelDir + '/' + f;
            fs.readdirSync(dir)
                .filter(m => {
                    return m.endsWith('.js');
                })
                .forEach(m => {
                    // let name = f.substring(0, f.length - 3);
                    (async () => {
                        await require(dir + '/' + m);
                    })();
                });
        });
}

export default addModels;
