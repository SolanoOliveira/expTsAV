import { cleanEnv, num, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    BCRYPT_ROUND: num(),
  });
}

export default validateEnv;
