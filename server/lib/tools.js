import uuid from 'node-uuid';

// 随机数id
function generateId() {
    return uuid.v1().replace(/-/g, '');
}

export { generateId };
