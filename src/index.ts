import express from 'express';
import router from './routes/index.routes.js';
import 'dotenv/config';
import { connectDB } from './config/database.js';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 10000;

connectDB();
app.use(express.json());
app.use('/api', router, (req, res) => {
  console.log( 'Response:', res.statusCode, res.statusMessage,res);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
