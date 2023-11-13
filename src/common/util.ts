import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function cryptoSha512(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 999, 64, 'sha512')
    .toString('base64');
}

export function uuid() {
  const tokens = uuidv4().split('-');
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
}
