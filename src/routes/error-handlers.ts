import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { Response } from "express"

export const handlePrismaError = (
  e: PrismaClientKnownRequestError,
  res: Response
): void => {
  console.warn(e)
  res.status(500).send({ error: e.message })
}
export const handleMissingParameters = (
  params: Record<string, unknown>,
  res: Response
): void => {
  const keyString = `{${Object.keys(params).reduce((a, b) => `${a}, ${b}`)}}`
  const errorMessage = `required parameters : ${keyString}`
  res.status(400).send({ error: errorMessage })
}
