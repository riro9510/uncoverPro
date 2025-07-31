const fs = require('fs');
const path = require('path');

// Obtener si será modo 'jwt' o 'session'
const authMode = process.argv[2]; // ejemplo: node create-auth.js jwt

if (!authMode || (authMode !== 'jwt' && authMode !== 'session')) {
  console.error('Error: MUST give "jwt" or "session" after the name of this script');
  process.exit(1);
}

const baseSrcPath = path.resolve(__dirname, '../src');

const folders = ['controllers', 'routes', 'services', 'middlewares', 'strategies'];

folders.forEach((folder) => {
  const folderPath = path.join(baseSrcPath, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📂 Carpeta creada: ${folderPath}`);
  }
});

// Contenidos base por archivo
const controllerContent = `
import * as authService from '../services/auth.service.js';
import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  const token = await authService.login(req.body);
  res.status(200).json({ token });
};
`;

const routeContent = `
import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', authController.login);

export default router;
`;

const serviceContentJWT = `
import jwt from 'jsonwebtoken';

export const login = async (data: { email: string, password: string }) => {
  const token = jwt.sign(
    { id: "user_id", email: data.email, role: 'user' },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );
  return token;
};
export const validUser = async (data: { userId: string }): Promise<boolean> => {
  return true;
}
`;

const serviceContentSession = `
export const login = async (data: { email: string, password: string }) => {
  // Session se maneja automáticamente por Passport
  return { message: 'Sesión iniciada' };
};
`;

const middlewareContent = `
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validUser } from '@/services/auth.service.js';
import { User } from '@/models/users.js';


// Extendemos el Request para que typescript sepa que existirá req.user
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    session?: {
      user?: User;
      [key: string]: any;
    };
  }
}

export const isAuthenticated = (roles?: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;

      const isValid = await validUser({ userId: decoded.id });

      if (!isValid) {
        return next({ status: 403, message: 'User disabled!' });
      }

      if (roles?.length && !roles.includes(decoded.role!)) {
        return next({ status: 403, message: 'Forbidden: Insufficient role' });
      }

      req.user = decoded;
      return next();
    }else if(req.session &&  req.session.user){

      const user = req.session.user as User;

      const isValid = await validUser({userId: user.id});

      if (!isValid) {
        return next({ status: 403, message: 'User disabled!' });
      }

      if (roles?.length && !roles.includes(user.role!)) {
        return next({ status: 403, message: 'Forbidden: Insufficient role' });
      }

      req.user = user; 
      return next();
    }else {

      return next({ status: 401, message: 'There is not a valid auth method' });
    }
    } catch (err) {
      return next({ status: 403, message: 'Invalid token or authorization error', details: err });
    }
  };
};

`;

const strategyContentJWT = `
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { validUser } from '@/services/auth.service.js';
import { User } from '@/models/users.js';
import bcrypt from 'bcrypt';


// JWT STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (payload, done) => {
      try {
        const isValid = await validUser({ userId: payload.id });
        if (!isValid) {
          return done(null, false);
        }
        return done(null, payload);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// SESSION STRATEGY (Local Strategy)
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isMatch = await bcrypt.compare(password, user.password); 

      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      if (!user.isActive) {
        return done(null, false, { message: 'User is disabled.' });
      }

      return done(null, user); 
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;

`;
const errorMiddleware = `
// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express';

export interface CustomError extends Error {
  status?: number;
  details?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Puedes loggear el error aquí si quieres
  console.error(\`[ERROR] \${req.method} \${req.url}: \${message}\`);

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
  });
};

`;
const dataBase = `
  import mongoose from 'mongoose';
import pg from 'pg'

const { Pool } = pg


export const connectDB = async () => {
  const dbType = process.env.DB_TYPE;

  try {
    if (dbType === 'mongo') {
      const uri = process.env.MONGO_URI!;
      await mongoose.connect(uri);
      console.log('✅ Connected to MongoDB');
    } else if (dbType === 'postgres') {
      const pool = new Pool({
        connectionString: process.env.POSTGRES_URI
      });
      await pool.connect();
      console.log('✅ Connected to PostgreSQL');
    } else {
      console.warn('⚠️ No DB_TYPE specified, skipping DB connection');
    }
  } catch (err) {
    console.error('❌ DB Connection error:', err);
    process.exit(1);
  }
};

`;

// Crear los archivos
const files = [
  { path: 'controllers/auth.controller.ts', content: controllerContent },
  { path: 'routes/auth.routes.ts', content: routeContent },
  {
    path: 'services/auth.service.ts',
    content: authMode === 'jwt' ? serviceContentJWT : serviceContentSession,
  },
  { path: 'middlewares/auth.middleware.ts', content: middlewareContent },
  {
    path: 'strategies/passport.strategy.ts',
    content: strategyContentJWT,
  },
  { path: 'middlewares/error.middleware.ts', content: errorMiddleware },
  {
    path: 'config/database.ts',
    content: dataBase,
  },
];

files.forEach((file) => {
  const fullPath = path.join(baseSrcPath, file.path);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, file.content.trim());
    console.log(`✅ Creado: ${file.path}`);
  } else {
    console.warn(`⚠️ Ya existe: ${file.path}`);
  }
});
