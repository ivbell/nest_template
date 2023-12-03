import * as crypto from 'crypto';
import configuration from '@/src/config/configuration';

export const passwordSaltHelper = (password: string): string => {
  const salt = configuration().password_salt;
  const hash = crypto.createHash('sha256');
  hash.update(password + salt);
  return hash.digest('hex');
};
