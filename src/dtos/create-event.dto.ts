import { z } from "zod";

const BaseEventSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  organizer: z.string().nonempty("Organizer is required"),
  location: z.string().nonempty("Location is required"),

  startDate: z.preprocess(
    (val) => {
      const date = new Date(val as string);
      return isNaN(date.getTime()) ? undefined : date;
    },
    z.date({ required_error: "Start date must be a valid date" })
  ),

  endDate: z.preprocess(
    (val) => {
      const date = new Date(val as string);
      return isNaN(date.getTime()) ? undefined : date;
    },
    z.date({ required_error: "End date must be a valid date" })
  ),
});

export const EventSchema = BaseEventSchema.refine(
  (data) => data.endDate > data.startDate,
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export const UpdateEventSchema = BaseEventSchema.partial().refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.endDate > data.startDate;
    }
    return true; 
  },
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export type CreateEventDto = z.infer<typeof EventSchema>;
export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;
