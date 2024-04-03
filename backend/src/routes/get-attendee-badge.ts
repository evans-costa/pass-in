import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:ticketId/badge",
    {
      schema: {
        params: z.object({
          ticketId: z.string().max(10),
        }),
        response: {},
      },
    },
    async (request, reply) => {
      const { ticketId } = request.params;

      const attendee = await prisma.attendee.findFirst({
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

      if (attendee === null) {
        throw new Error("Ticket not found");
      }

      return reply.send({ attendee });
    }
  );
}
