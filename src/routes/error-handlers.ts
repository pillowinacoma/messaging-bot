import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { Response } from "express"

export const handlePrismaError = (
  e: PrismaClientKnownRequestError,
  res: Response
): void => {
  console.warn(e)
  res.status(500).send({ error: e.message })
}
