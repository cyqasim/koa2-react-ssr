import addModels from '../models/addModals';
import db from './db';
// 导入所有模型
addModels();
// 新建数据库表
db.sync();
