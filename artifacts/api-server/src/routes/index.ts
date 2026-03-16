import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enquiryRouter from "./enquiry";
import reviewsRouter from "./reviews";

const router: IRouter = Router();

router.use(healthRouter);
router.use(enquiryRouter);
router.use(reviewsRouter);

export default router;
