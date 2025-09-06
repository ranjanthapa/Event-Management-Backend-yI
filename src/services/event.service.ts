import fs from "fs/promises";

import { join } from "path";
import { CreateEventDto, UpdateEventDto } from "../dtos/create-event.dto";
import { JwtPayloadI } from "../interfaces/jwt.payload.interface";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";
import { EventI } from "../interfaces/event.interace";
import { ApiError } from "../utils/api-error";

const eventFilePath = join(__dirname, "../data/events.data.json");

export const getEvents = async () => {
  const data = await fs.readFile(eventFilePath, "utf-8");
  return JSON.parse(data);
};

export const getEventById = async (id: string): Promise<EventI> => {
  const events = await getEvents();
  const event = events.find((evn: EventI) => evn.id === id);
  if (!event) {
    throw new ApiError("Invalid event id", 400);
  }
  return event;
};

export const createEvent = async (
  createEventDto: CreateEventDto,
  user: JwtPayloadI
) => {
  const randomId = randomUUID();
  const newCreatedEvent = {
    id: randomId,
    ...createEventDto,
    createdBy: user.id,
  };
  const events = await getEvents();
  events.push(newCreatedEvent);
  const data = JSON.stringify(events, null, 2);
  await fs.writeFile(eventFilePath, data);
  return newCreatedEvent;
};

export const updateEvent = async (
  id: string,
  updateEventDto: UpdateEventDto,
  user: JwtPayloadI
) => {
  const event = await getEventById(id);
  const isEventMatch = event.createdBy === user.id;
  if (!isEventMatch) {
    throw new ApiError("Unauthorized");
  }
  const events = await getEvents();
  const updateEvent = { ...event, ...updateEventDto };
  const filterEvents = events.filter((e: EventI) => e.id !== event.id);
  filterEvents.push(updateEvent);

  await fs.writeFile(eventFilePath, JSON.stringify(filterEvents, null, 2));
  return updateEvent;
};


export const deleteEvent = async(id: string, user: JwtPayloadI)=> {
  const event = await getEventById(id);
  const isEventMatch = event.createdBy === user.id;
  if(!isEventMatch){
    throw new ApiError("You are not allowed to perform");
  }
  const events = await getEvents();
  const filterEvents = events.filter((e: EventI) => e.id !== event.id);
  await fs.writeFile(eventFilePath, JSON.stringify(filterEvents, null, 2));
}