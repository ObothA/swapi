import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import errorHandler from './middleware/error';

// Routes
import moviesRoute from './routes/movies';

const app = express();

// JSON parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 300,
});

app.use(limiter);

// Enable cors
app.use(cors());

// Prevent http param pollution
app.use(hpp());

/** Mount Routers */
app.use('/api/1.0/movies', moviesRoute);

app.use(errorHandler);

export default app;
