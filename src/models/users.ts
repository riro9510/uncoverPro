export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role?: 'admin' | 'user' | 'moderator';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
