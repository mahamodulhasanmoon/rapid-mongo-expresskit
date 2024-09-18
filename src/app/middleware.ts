import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import { corsOrigin } from '../config';
import passport from 'passport';
const middleware = [
  morgan('dev'),
  cors({
    origin: corsOrigin,
  }),
  cookieParser(),
  express.static("docs"),
  express.json({ limit: '50mb' }),
  urlencoded({ extended: true }),


  session({
    secret: 'hello', // Replace with a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }),
  passport.initialize(),
  passport.session(),
  passport.authenticate('session'),
  

];
export default middleware;
