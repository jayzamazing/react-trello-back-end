'use strict';
import path from 'path';
import Express from 'express';
import morgan from 'morgan';
import { Router as userRouter } from './models/users';
import { Router as authRouter } from './models/auth';
import bodyParser from 'body-parser';
const app = Express();
app.use(morgan('common'));
app.use(Express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', authRouter);
app.use('/users/', userRouter);
app.get('*', (req, res) => {
  if (req.url.includes('.css')) {
    res.sendFile(path.join(__dirname, './static/css' + req.url));
  } else if(req.url.includes('.js')) {
    res.sendFile(path.join(__dirname, './static/js' + req.url));
  } else if(req.url.includes('.html')) {
    res.sendFile(path.join(__dirname, './static/index.html'));
  }
});
export default app;
