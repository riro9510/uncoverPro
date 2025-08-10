import cvrequestService from '../services/cvrequest.service.js';
import { Request, Response, NextFunction } from 'express';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await cvrequestService.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  create,
};
