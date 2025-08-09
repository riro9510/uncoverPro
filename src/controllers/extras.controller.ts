import extrasService from '../services/extras.service.js';
import { Request, Response, NextFunction } from 'express';

const getAll = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const langParam = req.query.lang;
    const lang: string | undefined =
      Array.isArray(langParam)
        ? typeof langParam[0] === 'string'
          ? langParam[0]
          : undefined
        : typeof langParam === 'string'
        ? langParam
        : undefined;
    const extras = await extrasService.getAllExtras(lang ?? 'en');
    
    res.json({
      success: true,
      data: Object.fromEntries(extras) 
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}


export default {
  getAll
};

