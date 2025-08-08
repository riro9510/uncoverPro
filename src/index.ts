import express from 'express';
import router from './routes/index.routes.js';
import 'dotenv/config';
import 'module-alias/register.js';
import "tsconfig-paths/register.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
