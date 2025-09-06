import { Router } from "express";
import {
  createEventController,
  deleteEventController,
  getAllEventController,
  updateEventController,
} from "../controllers/event.controller";
import { authMiddleware, restrictTo } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate-body.middleware";
import { EventSchema } from "../dtos/create-event.dto";

const eventRouter = Router();

eventRouter.get("/", getAllEventController);
eventRouter.post(
  "/",
  authMiddleware,
  restrictTo(["organizer"]),
  validateBody(EventSchema),
  createEventController
);

eventRouter.patch(
  "/:id",
  authMiddleware,
  restrictTo(["organizer"]),
  updateEventController
);

eventRouter.delete(
  "/:id",
  authMiddleware,
  restrictTo(["organizer"]),
  deleteEventController
);

export default eventRouter;
