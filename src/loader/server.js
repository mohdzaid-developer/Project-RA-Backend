import bodyParser from 'body-parser';
import cors from 'cors';
import logger from '../logger/index.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { API_CALL_LOG_FORMAT, CORS_ORIGIN_URLS, REQUEST_BODY_LIMIT } from '../config/index.js'

// swagger


export default (app,server) => {
    logger.info('initializationExpressServer()');

    const corsOptions = {
        origin: CORS_ORIGIN_URLS,
        methods: 'GET, OPTIONS, PUT, PATCH, POST, DELETE',
        exposedHeaders: 'message,showMessage'
    };

    const stream = {
        write: (message) => {
            logger.info(message);
        },
    };

    app.use(bodyParser.urlencoded({
        limit: `${REQUEST_BODY_LIMIT}mb`,
        extended: true,
    }));

    app.use(bodyParser.json({
        limit: `${REQUEST_BODY_LIMIT}mb`,
    }));

    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(morgan(API_CALL_LOG_FORMAT, { stream }));


    // const swaggerOptions = {
    //     definition: yaml.load(fs.readFileSync('./printx-doc.yaml', 'utf-8')),
    //     apis: ['./routes/*.js'], // Point to your route files
    //   };
};

