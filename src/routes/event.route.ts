import { Router } from "express";
import {
  createEventController,
  deleteEventController,
  getAllEventController,
  getEventByIdController,
  updateEventController,
} from "../controllers/event.controller";
import { authMiddleware, restrictTo } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate-body.middleware";
import { EventSchema } from "../dtos/create-event.dto";

const eventRouter = Router();

eventRouter.get("/", authMiddleware, getAllEventController);
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

eventRouter.get(
  "/:id",
  authMiddleware,
  getEventByIdController
);


export default eventRouter;
