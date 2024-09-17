import log from '../logger/index.js';
import { errorHandler } from '../middleware/error_handler.js';
import routerV1 from './v1/index.js';
import path from 'path'
import express from "express"
import { fileURLToPath } from 'url';


export default function initializeRoutes(app) {
  log.info('initializeRoutes()');

//   app.get("/",(res,resp)=>{ 
//     resp.send('results'); 
// });

  // Set up API routes for v1
  app.use('/api/v1/', routerV1);

  // Handle 404 errors
  app.get('/running', function (req, res) {
    res.status(404).send('Not Found');
  });

  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, '../../../Project-RA-Frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../Project-RA-Frontend/dist', 'index.html'));
  });
  // Use the error handler middleware
  app.use(errorHandler);
}
