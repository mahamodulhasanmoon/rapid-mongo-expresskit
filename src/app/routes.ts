import { NextFunction, Request, Response, Router } from 'express';
import { modulerRoutes } from '../routes';
const routes = Router();

routes.get('/health', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      status: 200,
      message: 'success',
    });
  } catch (error) {
    next(error);
  }
});

// all Routes
modulerRoutes.forEach(({ path, route }) => routes.use(path, route));

export default routes;
