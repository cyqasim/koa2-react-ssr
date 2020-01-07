export const JWT_SECRET = 'user_token';
export const JWT_IGNORE = [
    /^\/api\/login/,
    /^\/api\/register/,
    /^\/api\/checkUser/,
    /^\/api\/forgetPswd/,
    /^\/api\/article\/list/,
    /^((?!\/api).)*$/
];
