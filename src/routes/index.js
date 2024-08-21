import log from '../logger/index.js';
import { errorHandler } from '../middleware/error_handler.js';
import routerV1 from './v1/index.js';

export default function initializeRoutes(app) {
  log.info('initializeRoutes()');

  app.get("/",(res,resp)=>{ 
    resp.send('results'); 
});

  // Set up API routes for v1
  app.use('/api/v1/', routerV1);

  // Handle 404 errors
  app.get('*', function (req, res) {
    res.status(404).send('Not Found');
  });

  // Use the error handler middleware
  app.use(errorHandler);
}
