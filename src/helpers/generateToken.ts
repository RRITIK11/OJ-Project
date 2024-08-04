import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || ''; 
const EXPIRATION = '1h';

interface UserPayload {
    id: string;
    isAdmin: boolean;
    isModerator: boolean;
}

export function generateToken(user: UserPayload): string {
    return jwt.sign(user, SECRET_KEY, { expiresIn: EXPIRATION });
}
