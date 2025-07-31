const fs = require('fs');
const path = require('path');

const routesDir = path.resolve(__dirname, '../src/routes');
const indexRoutesPath = path.join(routesDir, 'index.routes.ts');

if (fs.existsSync(indexRoutesPath)) {
  fs.unlinkSync(indexRoutesPath);
  console.log(`❌ Archivo eliminado: ${indexRoutesPath}`);
}

// Crear el archivo index.routes.ts con el encabezado básico
const importExpress = `import { Router } from 'express';\n`;
const appDeclaration = `const router = Router();\n`;
fs.writeFileSync(indexRoutesPath, importExpress + appDeclaration, 'utf8');
console.log(`📂 Archivo creado: ${indexRoutesPath}`);

// Usamos reduce para recolectar las rutas primero
const routeImports = fs.readdirSync(routesDir).reduce(
  (acc, file) => {
    if (file.endsWith('route.ts')) {
      const routeName = file.split('.')[0];
      const importStatement = `import ${routeName} from './${file}';\n`;
      const routeRegistration = `router.use('/${routeName.replace('Api', '').toLowerCase()}', ${routeName});\n`;

      acc.imports.push(importStatement);
      acc.routes.push(routeRegistration);
    }
    return acc;
  },
  { imports: [], routes: [] }
);

fs.appendFileSync(indexRoutesPath, routeImports.imports.join(''), 'utf8');
routeImports.routes.forEach((route) => {
  fs.appendFileSync(indexRoutesPath, route, 'utf8');
  console.log(`✅ Ruta registrada: ${route}`);
});

console.log(`📝 Rutas registradas correctamente en ${indexRoutesPath}`);
