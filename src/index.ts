import express from 'express';
import router from './routes/index.routes.js';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import path from 'path';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import http from 'http';
import { generateCoverLetter, generateCV } from './services/pdfGenerator.js';
//import { fileURLToPath } from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const app = express();
const PUBLIC_DIR = process.env.NODE_ENV === 'production'
  ? path.join(process.cwd(), 'dist', 'public') 
  : path.join(process.cwd(), 'public');       

app.use(express.static(PUBLIC_DIR));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;
//const frontendPath = path.join(__dirname, '../front');

// Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'https://riro9510.github.io',
];

connectDB();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // para Postman o curl sin origin
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // habilita Access-Control-Allow-Credentials
  })
);

app.use(express.json());
//app.use(express.static(frontendPath));
app.use('/api', router);

/*app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});*/

/*app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});*/

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('✅ Client connected');

  ws.on('message', async (msg) => {
    console.log('📨 Message received');
    try {
      const payload = JSON.parse(msg.toString());
      console.log('📝 Payload parsed', payload);

      const cvPath = path.join(PUBLIC_DIR, 'cv.pdf');
      const letterPath = path.join(PUBLIC_DIR, 'coverLetter.pdf');

      await generateCV(payload, cvPath);
      console.log('📄 CV generated');

      await generateCoverLetter(payload, letterPath);
      console.log('📄 Cover letter generated');

      ws.send(
        JSON.stringify({
          type: 'ready',
          cvUrl: '/cv.pdf',
          letterUrl: '/coverLetter.pdf',
        })
      );
      console.log('✅ Ready sent');
    } catch (err: any) {
      console.error('❌ WS handler error:', err);
      try {
        ws.send(JSON.stringify({ type: 'error', message: err.message }));
      } catch (_) {}
    }
  });

  ws.on('close', () => console.log('⚠️ Client disconnected'));
  ws.on('error', (err) => console.error('❌ WS error:', err));
});

// --- Iniciar servidor HTTP + WebSocket ---
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP/WebSocket escuchando en puerto ${PORT}`);
});
export default app;
