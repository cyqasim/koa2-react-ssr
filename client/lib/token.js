import { load } from 'react-cookies';
let token = null;

if (typeof window !== 'undefined' && window.document && window.document.createElement) {
    token = load('user_token');
} else {
    console.log(global.TOKEN, 'xkxkxkxkxxk');
    token = global.TOKEN;
}

export default token;
