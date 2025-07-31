const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const folderStructure = [
  'src/config',
  'src/controllers',
  'src/middlewares',
  'src/models',
  'src/routes',
  'src/services',
  'src/utils',
  'src/validations',
  'tests/controllers',
  'tests/services',
  'tests/middlewares',
  'tests/utils',
  'public',
];
const content = {
  'src/controllers/user.controller.ts': `import { Request,Response } from "express";
import { User } from "../models/users.js";

const mockUser: User = {
    id: '1',
    name: 'Ricardo Ramos',
    email: 'ricardo@example.com'
  };
  
  export const getUser = (req: Request, res: Response) => {
    res.json(mockUser);
  };`,
  'src/models/users.ts': `export interface User {
  id: string;          
  name: string;
  email: string;
  passwordHash: string;
  role?: 'admin' | 'user' | 'moderator'; 
  isActive: boolean;    
  createdAt: Date;
  updatedAt: Date;
}
`,
  'src/routes/user.routes.ts': `import { Router } from 'express';
import { getUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/user', getUser);

export default router;
`,
  'src/index.ts': `import express from 'express';
import userRoutes from './routes/user.routes.js';
import 'dotenv/config';
import 'module-alias/register';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
console.log(\`Server is running on port \${PORT}\`);
});

export default app;
`,
  'tsconfig.json': `{
  "extends": "./tsconfig.paths.json",
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["node"],
    "allowJs": true
  },
  "include": ["src/**/*.ts", "src/**/*.js"],
  "exclude": ["node_modules"]
}

`,
  'eslint.config.js': `
import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/.*.js', '**/*.config.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
];
`,
  '.prettierignore': `node_modules
dist
coverage
`,
  '.prettierrc': `{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
`,
  'src/middlewares/global.middlewares.ts': `
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const loadMiddlewares = (app: Express) => {
  app.use(helmet());
  app.use(cors());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
  }

  app.use(express.json());
};

export default loadMiddlewares;
`,
'tsconfig.paths.json': `
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
`
};
const scriptPath = path.resolve(__dirname, '../check-env.sh');
function createFolders(basePath, folders) {
  folders.forEach((folder) => {
    const dirPath = path.resolve(basePath, '..', folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Carpeta creada: ${dirPath}`);
    }
  });
}

function createExampleComponents(content) {
  Object.entries(content).forEach(([filePath, fileContent]) => {
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Carpeta creada: ${dirPath}`);
    }

    fs.writeFileSync(filePath, fileContent);
    console.log(`Archivo creado: ${filePath}`);
  });
}
createFolders(__dirname, folderStructure);
createExampleComponents(content);
const child = spawn('bash', [scriptPath], {
  stdio: 'inherit',
  detached: true,
});

child.unref();
