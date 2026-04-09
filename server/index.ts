import 'dotenv/config';
import express from 'express';
import { config } from './config';
import { connectMongo } from './lib/db';
import healthRouter from './routes/health.routes';
import authRouter from './routes/auth.routes';
import customersRouter from './routes/customers.routes';
import employeesRouter from './routes/employees.routes';
import servicesRouter from './routes/services.routes';
import productsRouter from './routes/products.routes';
import serviceCategoriesRouter from './routes/serviceCategories.routes';
import productCategoriesRouter from './routes/productCategories.routes';

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/customers', customersRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/products', productsRouter);
app.use('/api/service-categories', serviceCategoriesRouter);
app.use('/api/product-categories', productCategoriesRouter);

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
