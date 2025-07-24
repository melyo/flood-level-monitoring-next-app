/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Sensor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sensor_code_key" ON "Sensor"("code");
