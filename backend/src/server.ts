import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { checkIn } from "./routes/check-ins";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

export const app = fastify();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especificações da API para o backedn da aplicação pass.in",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(checkIn);

app.register(getEvent);
app.register(getEventAttendees);
app.register(getAttendeeBadge);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running on port 3333");
});
