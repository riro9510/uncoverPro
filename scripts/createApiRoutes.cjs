const fs = require('fs');
const path = require('path');

const basePath = path.resolve(__dirname, '..');

const srcPath = path.join(basePath, 'src');

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

if (!fs.existsSync(srcPath)) {
  console.error('❌ Folder does not exist. please run ./init.sh');
  process.exit(1);
}

const rawInput = process.argv[2];
if (!rawInput) {
  console.error('❌ You must give at least one api name (ej: users o users,books,tasks)');
  process.exit(1);
}
const moduleNames = rawInput.split(',').map((name) => name.trim().toLowerCase());

const folders = ['routes', 'controllers', 'services', 'models', 'tests'];

const dbType = process.argv.includes('--db=pg') ? 'pg' : 'mongo';
function createModuleFiles(moduleName) {
  folders.forEach((folder) => {
    const folderPath = path.join(srcPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`📂 Folder created: ${folderPath}`);
    }

    const singularFolder = folder.slice(0, -1);
    const fileName = `${moduleName}.${singularFolder}.ts`;
    const filePath = path.join(folderPath, fileName);

    if (fs.existsSync(filePath)) {
      console.warn(`⚠️ File already exist: ${filePath}`);
      return;
    }

    let content = '';

    if (folder === 'routes') {
      content = `
        import express from 'express';
        import ${moduleName}Controller from '../controllers/${moduleName}.controller.js';
        import { isAuthenticated } from '@/middlewares/auth.middleware.js';
        import { errorHandler } from '../middlewares/error.middleware.js';
        const router = express.Router();

        // CREATE
        router.post('/', isAuthenticated(), ${moduleName}Controller.create);

        // READ ALL
        router.get('/', isAuthenticated(), ${moduleName}Controller.getAll);

        // READ ONE
        router.get('/:id', isAuthenticated(), ${moduleName}Controller.getById);

        // UPDATE
        router.put('/:id', isAuthenticated(), ${moduleName}Controller.update);

        // DELETE
        router.delete('/:id', isAuthenticated(), ${moduleName}Controller.remove);

        router.use(errorHandler)

        export default router;
        `;
    }

    if (folder === 'controllers') {
      content = `import ${moduleName}Service from '../services/${moduleName}.service.js';
import { Request, Response, NextFunction } from 'express';

const create = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const result = await ${moduleName}Service.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const result = await ${moduleName}Service.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const result = await ${moduleName}Service.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const result = await ${moduleName}Service.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req:Request, res:Response, next:NextFunction) => {
  try {
    await ${moduleName}Service.remove(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};

`;
    }

    if (folder === 'services') {
      content = `import mongoose from 'mongoose';
import ${capitalize(moduleName)} from '@/models/${capitalize(moduleName)}.model.js';

const create = async (data) => {
  const register = await ${capitalize(moduleName)}.create({ data });
  return register;
};

const getAll = async () => {
  return await ${capitalize(moduleName)}.find();
};

const getById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }
  return await ${capitalize(moduleName)}.findById(id);
};

const update = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('ID inválido');
  }
  return await ${capitalize(moduleName)}.updateOne({ _id: id }, { $set: data });
};

const remove = async (id) => {
  return await ${capitalize(moduleName)}.deleteOne({ _id: id });
};

export default {
  create,
  getAll,
  getById,
  update,
  remove
};

`;
    }

    if (folder === 'models') {
      content =
        dbType === 'pg'
          ? `import { DataTypes } from 'sequelize';
    import sequelize from '@/db/sequelize';
    
    const ${capitalize(moduleName)} = sequelize.define('${capitalize(moduleName)}', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT
    }, {
      timestamps: true
    });
    
    export default ${capitalize(moduleName)};`
          : `import mongoose from 'mongoose';
    
    const ${moduleName}Schema = new mongoose.Schema({
      name: { type: String, required: true },
      description: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const ${capitalize(moduleName)} = mongoose.model('${capitalize(moduleName)}', ${moduleName}Schema);
    
    export default ${capitalize(moduleName)};`;
    }

    if (folder === 'tests') {
      content = `import request from 'supertest';
    import app from '../index.js';
    
    describe('${capitalize(moduleName)} API', () => {
      it('should return 200 on GET /${moduleName}', async () => {
        const res = await request(app).get('/${moduleName}');
        expect(res.statusCode).toBe(200);
      });
    
      it('should create item on POST /${moduleName}', async () => {
        const payload = { name: 'Sample ${moduleName}' };
        const res = await request(app).post('/${moduleName}').send(payload);
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
      });
    });
    `;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Creado ${filePath}`);
  });
}

moduleNames.forEach(createModuleFiles);
