import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import { handleMissingParameters, handlePrismaError } from "./error-handlers"

const prisma = new PrismaClient()

export const login: RequestHandler = async (req, res) => {
  const { userEmail, password } = req.body
  console.log("UGLIUJGIUGB", req.body)

  if (!userEmail || !password) {
    handleMissingParameters({ userEmail, password }, res)
    return
  }
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
      password,
    },
  })
  if (!user) {
    res.status(401).send({ userEmail: "" }) // Unauthorised
    return
  }
  res.status(200).send({ userEmail })
}

export const createUser: RequestHandler = async (req, res) => {
  const { userEmail, password } = req.body

  if (!userEmail || !password) {
    handleMissingParameters({ userEmail, password }, res)
  }

  const user = await prisma.user
    .create({
      data: {
        email: userEmail,
        password,
      },
    })
    .catch((e) => {
      handlePrismaError(e, res)
    })

  if (user) res.status(201).send({ userEmail })
}

export const getUserMessages: RequestHandler = async (req, res) => {
  const { userEmail } = req.query

  if (!userEmail || typeof userEmail !== "string") {
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
      include: {
        author: true,
        webhook: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (messages) res.status(200).send({ messages })
}

export const getUserWebhooks: RequestHandler = async (req, res) => {
  const { userEmail } = req.query

  if (!userEmail || typeof userEmail !== "string") {
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
      include: {
        messages: true,
        users: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (webhooks) res.status(200).send({ webhooks })
}

export const getUserMessagesByWebhook: RequestHandler = async (req, res) => {
  const { userEmail, url } = req.query

  if (
    !userEmail ||
    !url ||
    typeof url !== "string" ||
    typeof userEmail !== "string"
  ) {
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
      include: {
        author: true,
        webhook: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (messages) res.status(200).send({ messages })
}
