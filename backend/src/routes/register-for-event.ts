import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { generateNanoId } from "../utils/generate-nanoid";

export async function registerForEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events/:eventId/attendees",
    {
      schema: {
        summary: "Register an attendee for an event",
        tags: ["events"],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendee: z.object({
              id: z.number(),
              ticketId: z.string().length(10),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params;
      const { name, email } = request.body;

      const attendeeFromEmail = await prisma.attendee.findUnique({
        where: {
          eventId_email: {
            email,
            eventId,
          },
        },
      });

      if (attendeeFromEmail !== null) {
        throw new Error("This email is already registered for this event");
      }

      const [event, amountOfAttendeesForEvent] = await Promise.all([
        prisma.event.findUnique({
          where: {
            id: eventId,
          },
        }),

        prisma.attendee.count({
          where: {
            eventId,
          },
        }),
      ]);

      if (event?.maximumAttendees && amountOfAttendeesForEvent > event?.maximumAttendees) {
        throw new Error("The maximum attendees for this event is already reached.");
      }

      const ticketId = generateNanoId();

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
          ticketId,
        },
      });

      return reply.status(201).send({
        attendee: {
          id: attendee.id,
          ticketId: attendee.ticketId,
        },
      });
    }
  );
}
