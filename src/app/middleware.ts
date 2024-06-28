import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { corsOrigin } from '../config';
const middleware = [
  morgan('dev'),
  cors({
    origin: corsOrigin,
  }),
  cookieParser(),
  // express.static("docs"),
  express.json({ limit: '50mb' }),
  urlencoded({ extended: true }),
];
export default middleware;
