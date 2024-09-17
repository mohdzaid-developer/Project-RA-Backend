import log from '../logger/index.js';
import { errorHandler } from '../middleware/error_handler.js';
import routerV1 from './v1/index.js';
import path from 'path'
import express from "express"
import cors from "cors"
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

  app.use((req, res, next) => {
    res.setHeader('Origin-Agent-Cluster', '?1');
    next();
});
  // app.use(express.json())
  // const __dirname=path.dirname("")
  // const buildpath=path.join(__dirname,"../../../Project-RA-Frontend/dist", 'index.html')
  // app.use(express.static(buildpath));
  // app.use(cors({ origin: '*' }));

// Remove Cross-Origin-Opener-Policy header
// app.use((req, res, next) => {
//   res.removeHeader('Cross-Origin-Opener-Policy');
//   next();
// });

  // app.use(cors({"origin":"*",}))


  const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//   app.use(express.static(path.join(__dirname, '../../../Project-RA-Frontend/dist')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../../Project-RA-Frontend/dist', 'index.html'));
//   });

app.use(express.static(path.join(__dirname, '../../../Project-RA-Frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../Project-RA-Frontend/dist', 'index.html'));
});

  // Use the error handler middleware
  app.use(errorHandler);
}
