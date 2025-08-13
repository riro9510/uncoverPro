import express from 'express';
import router from './routes/index.routes.js';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import path from 'path';
import cors from 'cors';
import { WebSocketServer } from 'ws';

//import { fileURLToPath } from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;
//const frontendPath = path.join(__dirname, '../front');

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
   'http://127.0.0.1:5500',
   'https://riro9510.github.io'
];

connectDB();
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // para Postman o curl sin origin
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // habilita Access-Control-Allow-Credentials
}));
app.use(express.json());
//app.use(express.static(frontendPath));
app.use('/api', router, (req, res) => {
  console.log('Response:', res.statusCode, res.statusMessage, res);
});

/*app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});*/

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
