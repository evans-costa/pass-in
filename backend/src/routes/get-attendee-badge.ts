import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest, NotFound } from "../_errors";

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:ticketId/badge",
    {
      schema: {
        summary: "Get an attendee badge",
        tags: ["attendees"],
        params: z.object({
          ticketId: z.string().length(10),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { ticketId } = request.params;

      const attendeeWithTicket = await prisma.attendee.findFirst({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
          ticketId: true,
        },
        where: {
          ticketId,
        },
      });

      if (attendeeWithTicket === null) {
        throw new NotFound("Ticket not found");
      }

      const baseURL = `${request.protocol}://${request.hostname}`;

      const checkInURL = new URL(`/attendees/${ticketId}/check-in`, baseURL);

      return reply.send({
        badge: {
          name: attendeeWithTicket.name,
          email: attendeeWithTicket.email,
          eventTitle: attendeeWithTicket.event.title,
          checkInURL: checkInURL.toString(),
        },
      });
    }
  );
}
