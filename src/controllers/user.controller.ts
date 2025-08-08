import { Request, Response } from 'express';
import { User } from '../models/users.js';

const mockUser: User = {
  id: '1',
  name: 'Ricardo Ramos',
  email: 'ricardo@example.com',
  passwordHash: 'hashedpassword123',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const getUser = (req: Request, res: Response) => {
  res.json(mockUser);
};
