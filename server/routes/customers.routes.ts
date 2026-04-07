import { Router } from 'express';
import { createCustomer, createWalkInCustomer, listCustomers } from '../controllers/customers.controller';

const customersRouter = Router();

customersRouter.get('/', listCustomers);
customersRouter.post('/', createCustomer);
customersRouter.post('/walk-in', createWalkInCustomer);

export default customersRouter;
