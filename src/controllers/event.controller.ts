import { NextFunction, Request, Response } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../services/event.service";
import { CreateEventDto, UpdateEventDto } from "../dtos/create-event.dto";
import { JwtPayloadI } from "../interfaces/jwt.payload.interface";

export const getAllEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getEvents();
    res.status(200).json({
      events,
    });
  } catch (error) {
    next(error);
  }
};

export const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventDto = req.body as CreateEventDto;
    const user = req.user as JwtPayloadI;
    const event = await createEvent(eventDto, user);
    return res.status(201).json({
      status: "success",
      event,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateDto = req.body as UpdateEventDto;
    const user = req.user as JwtPayloadI;
    const id = req.params.id;

    const updatedEvent = await updateEvent(id, updateDto, user);
    return res.status(200).json({
      status: "success",
      updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = req.user as JwtPayloadI;
    await deleteEvent(id, user);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
