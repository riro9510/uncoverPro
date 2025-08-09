import Language from '../services/language.service.js';
import { Request, Response, NextFunction } from 'express';


const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Language.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Language.getById(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};


export default {
  getAll,
  getById
};
