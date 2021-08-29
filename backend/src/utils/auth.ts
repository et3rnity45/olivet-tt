import jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';

export type Payload = {
  user?: string;
};

export function generateToken(user: User): string {
  const key = process.env.JWT_KEY || 'secretkey';
  return jwt.sign({ user: user.email }, key);
}

export function verifyToken(token: string): Payload {
  const key = process.env.JWT_KEY || 'secretkey';
  const payload = jwt.verify(token, key) as Payload;
  return payload;
}
