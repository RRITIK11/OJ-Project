import jwt from 'jsonwebtoken';
import { User } from './types';
const SECRET_KEY = process.env.TOKEN_SECRET || '';

export const verifyToken = async (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as User);
    });
  });
};