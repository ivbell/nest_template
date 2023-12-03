import { generateRandomStringHelper } from '@/src/common/helpers/generate-random-string.helper';

export default () => ({
  port: parseInt(process.env.PORT, 10) ?? 3000,
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) ?? 5432,
    username: process.env.DATABASE_USERNAME ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    database: process.env.DATABASE_NAME ?? 'postgres',
  },
  password_salt: process.env.PASSWORD_SALT ?? generateRandomStringHelper(100),
  jwt: {
    secret: process.env.JWT_SECRET ?? generateRandomStringHelper(100),
    expires_in: process.env.JWT_EXPIRE_IN ?? '1h',
  },
  cookie: {
    secret: process.env.COOKIE_SECRET ?? generateRandomStringHelper(100),
  },
});
