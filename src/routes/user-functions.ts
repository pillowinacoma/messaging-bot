import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import { handleMissingParameters, handlePrismaError } from "./error-handlers"

const prisma = new PrismaClient()

export const login: RequestHandler = async (req, res) => {
  const { userEmail } = req.body

  if (!userEmail) {
    handleMissingParameters({ userEmail }, res)
    return
  }
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  })
  if (!user) res.status(401).send() // Unauthorised
  res.status(200).send()
}

export const getUserMessages: RequestHandler = async (req, res) => {
  const { userEmail } = req.body

  if (!userEmail) {
    handleMissingParameters({ userEmail }, res)
    return
  }

  const messages = await prisma.message
    .findMany({
      where: {
        author: {
          email: userEmail,
        },
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (messages) res.status(200).send({ messages })
}

export const getUserWebhooks: RequestHandler = async (req, res) => {
  const { userEmail } = req.body

  if (!userEmail) {
    handleMissingParameters({ userEmail }, res)
    return
  }

  const webhooks = await prisma.webhook
    .findMany({
      where: {
        users: {
          every: {
            email: userEmail,
          },
        },
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (webhooks) res.status(200).send({ webhooks })
}

export const getUserMessagesByWebhook: RequestHandler = async (req, res) => {
  const { userEmail, url } = req.body

  if (!userEmail || !url) {
    handleMissingParameters({ userEmail, url }, res)
    return
  }

  const messages = await prisma.message
    .findMany({
      where: {
        AND: {
          author: {
            email: userEmail,
          },
          webhook: {
            url,
          },
        },
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (messages) res.status(200).send({ messages })
}
