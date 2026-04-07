import 'dotenv/config';
import express from 'express';
import { config } from './config';
import { connectMongo } from './lib/db';
import healthRouter from './routes/health.routes';
import authRouter from './routes/auth.routes';
import customersRouter from './routes/customers.routes';

const app = express();
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);

connectMongo()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`API listening on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
