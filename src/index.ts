import express from 'express';
import router from './routes/index.routes.js';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import https from 'http';
import { generateCoverLetterBuffer, generateCVBuffer } from './services/pdfGenerator.js';
import { fileURLToPath } from 'url';
import { FormRequest } from './models/formRequestInterface.js';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PUBLIC_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

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
app.use('/temp', express.static(PUBLIC_DIR));
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(PUBLIC_DIR, req.params.filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Error downloading file');
      }
    });
  } else {
    res.status(404).send('File not found');
  }
});

app.get('/generate-both', async (req, res) => {
  try {
    const queryParams = req.query as unknown as FormRequest;
    const cvBuffer = await generateCVBuffer(queryParams);
    const letterBuffer = await generateCoverLetterBuffer(queryParams);

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=Documentos_${Date.now()}.zip`);

    const archive = archiver('zip', { zlib: { level: 9 } });
    archive.pipe(res);

    archive.append(cvBuffer, { name: 'CV.pdf' });
    archive.append(letterBuffer, { name: 'CartaPresentacion.pdf' });

    await archive.finalize();
  } catch (err: any) {
    console.error('❌ Error generando ZIP:', err);
    res.status(500).json({ error: err.message });
  }
});

/*app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});*/

/*app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});*/

const server = https.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', async (msg) => {
    try {
      const payload = JSON.parse(msg.toString());
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://uncoverpro.onrender.com'
          : `http://localhost:${PORT}`;

      if (!payload['personal_info.full_name']) {
        throw new Error('Faltan datos requeridos');
      }

      ws.send(
        JSON.stringify({
          type: 'ready',
          zipUrl: `${baseUrl}/generate-both?${new URLSearchParams(payload)}`,
        })
      );
    } catch (err: any) {
      console.error('❌ WS error:', err);
      ws.send(
        JSON.stringify({
          type: 'error',
          message: err.message,
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        })
      );
    }
  });
});

// --- Iniciar servidor HTTP + WebSocket ---
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP/WebSocket escuchando en puerto ${PORT}`);
  console.log(`Temp files directory: ${PUBLIC_DIR}`);
});
export default app;
