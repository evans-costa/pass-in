import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "../_errors";

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:ticketId/check-in",
    {
      schema: {
        summary: "Check-in an attendee",
        tags: ["attendees"],
        params: z.object({
          ticketId: z.string().length(10),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { ticketId } = request.params;

      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          ticketId,
        },
      });

      if (attendeeCheckIn !== null) {
        throw new BadRequest("Attendee already checked in!");
      }

      await prisma.checkIn.create({
        data: {
          ticketId,
        },
      });

      return reply.status(201).send();
    }
  );
}
