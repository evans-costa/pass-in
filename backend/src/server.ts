import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { checkIn } from "./routes/check-ins";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

export const app = fastify();

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
