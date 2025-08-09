import express from 'express';
import formularioController from '../controllers/language.controller.js';
const router = express.Router();

// READ ALL
router.get('/', formularioController.getAll);

// READ ONE
router.get('/:id', formularioController.getById);

export default router;
