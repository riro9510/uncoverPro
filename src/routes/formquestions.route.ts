import express from 'express';
import formquestionsController from '../controllers/formquestions.controller.js';
const router = express.Router();

router.get('/', formquestionsController.getAll);

router.get('/:id', formquestionsController.getByLanguagename);

export default router;
