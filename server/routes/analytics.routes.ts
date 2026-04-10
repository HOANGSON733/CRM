import { Router } from 'express';
import { getDashboardAnalytics, getReportsAnalytics, getStaffPerformance } from '../controllers/analytics.controller.ts';

const analyticsRouter = Router();

analyticsRouter.get('/dashboard', getDashboardAnalytics);
analyticsRouter.get('/reports', getReportsAnalytics);
analyticsRouter.get('/staff-performance', getStaffPerformance);

export default analyticsRouter;

