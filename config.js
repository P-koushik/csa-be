const port = process.env.PORT || 8000;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET
const USER_JWT_SECRET = process.env.USER_JWT_SECRET

export {port, ADMIN_JWT_SECRET, USER_JWT_SECRET};
