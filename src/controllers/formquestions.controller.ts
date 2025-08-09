import formquestionsService from '../services/formquestions.service.js';
import type { Request, Response, NextFunction } from 'express-serve-static-core';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await formquestionsService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await formquestionsService.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
};
