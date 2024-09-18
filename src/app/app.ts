import express, { Application } from 'express';
import './../config/passport';
import path from 'path';
import middleware from './middleware';
import routes from './routes';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import { errorHandler } from './errors';
import { notFoundHandler } from '../errors/notFoundError';
const app: Application = express();
const doc = YAML.load(`${process.cwd()}/src/docs/swagger.yaml`);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(doc));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.json());
app.use(middleware);
app.use('/api/v1', routes);
app.use(notFoundHandler);
app.use(errorHandler);


export default app;
