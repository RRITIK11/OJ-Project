import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.TOKEN_SECRET || '';

export const verifyToken = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};