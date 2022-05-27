import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import { handleMissingParameters, handlePrismaError } from "./error-handlers"

const prisma = new PrismaClient()

export const createMessage: RequestHandler = async (req, res) => {
  const { userEmail, url, success, content } = req.body
  if (!userEmail || !url || !success) {
    handleMissingParameters({ userEmail, url, success }, res)
    return
  }

  const message = await prisma.message
    .create({
      data: {
        success,
        content,
        webhook: {
          connect: {
            url,
          },
        },
        author: {
          connect: {
            email: userEmail,
          },
        },
      },
      include: {
        author: true,
        webhook: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))

  if (message) res.status(201).send({ message })
}
export const deleteMessage: RequestHandler = async (req, res) => {
  const { id } = req.body
  if (!id) {
    handleMissingParameters({ id }, res)
    return
  }
  const message = await prisma.message.delete({
    where: {
      id,
    },
  })

  if (message) res.status(200).send({ message })
}
