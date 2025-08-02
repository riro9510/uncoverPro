import express from 'express';
import userRoutes from './routes/user.routes.js';
import 'dotenv/config';
import 'module-alias/register';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
