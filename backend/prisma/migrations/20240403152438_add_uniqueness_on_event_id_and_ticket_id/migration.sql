/*
  Warnings:

  - A unique constraint covering the columns `[ticket_id]` on the table `attendees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[event_id,ticket_id]` on the table `attendees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendees_ticket_id_key" ON "attendees"("ticket_id");

-- CreateIndex
CREATE UNIQUE INDEX "attendees_event_id_ticket_id_key" ON "attendees"("event_id", "ticket_id");
