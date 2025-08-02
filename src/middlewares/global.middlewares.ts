import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const loadMiddlewares = (app: Express) => {
  app.use(helmet());
  app.use(cors());

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
  }

  app.use(express.json());
};

export default loadMiddlewares;
