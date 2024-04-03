/*
  Warnings:

  - You are about to drop the column `attendee_id` on the `check_ins` table. All the data in the column will be lost.
  - Added the required column `ticket_id` to the `check_ins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_check_ins" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ticket_id" TEXT NOT NULL,
    CONSTRAINT "check_ins_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "attendees" ("ticket_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_check_ins" ("created_at", "id") SELECT "created_at", "id" FROM "check_ins";
DROP TABLE "check_ins";
ALTER TABLE "new_check_ins" RENAME TO "check_ins";
CREATE UNIQUE INDEX "check_ins_ticket_id_key" ON "check_ins"("ticket_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
