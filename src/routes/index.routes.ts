import { Router } from 'express';
const router = Router();
import formulario from './formulario.route.js';
router.use('/formulario', formulario);

export default router;
