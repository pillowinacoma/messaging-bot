import { RequestHandler } from "express"

import { PrismaClient } from "@prisma/client"
import { handleMissingParameters, handlePrismaError } from "./error-handlers"

const prisma = new PrismaClient()

export const createWebhook: RequestHandler = async (req, res) => {
  const { userEmail, url, plateform, isPublic } = req.body

  if (!userEmail || !url || !plateform) {
    handleMissingParameters({ userEmail, url, plateform }, res)
    return
  }
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  })

  const webhookExist = await prisma.webhook
    .findFirst({
      where: {
        url,
      },
    })
    .then(async (webhook) => {
      if (webhook) {
        await prisma.webhook.update({
          where: {
            url,
          },
          data: {
            users: {
              connect: {
                email: userEmail,
              },
            },
          },
          include: {
            users: true,
          },
        })
      }
      return webhook
    })
  if (webhookExist) {
    res.status(200).send({ webhook: webhookExist })
    return
  }
  const webhook = await prisma.webhook
    .create({
      data: {
        plateform,
        public: !!isPublic,
        url,
        users: {
          connect: {
            email: user?.email,
          },
        },
      },
      include: {
        users: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))
  res.status(201).send({ webhook })
}

export const updateWebhook: RequestHandler = async (req, res) => {
  const { url, plateform, isPublic } = req.body
  if (!url) {
    handleMissingParameters({ url }, res)
    return
  }
  const webhook = await prisma.webhook
    .update({
      where: {
        url,
      },
      data: {
        plateform,
        public: isPublic,
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (webhook) res.status(200).send({ webhook })
}

export const deleteWebhook: RequestHandler = async (req, res) => {
  const { url } = req.body
  if (!url) {
    handleMissingParameters({ url }, res)
    return
  }
  const webhook = await prisma.webhook
    .delete({
      where: {
        url,
      },
    })
    .catch((e) => handlePrismaError(e, res))

  if (webhook) res.status(200).send({ data: webhook })
}

export const getWebhooks: RequestHandler = async (_, res) => {
  const webhooks = await prisma.webhook
    .findMany({
      include: {
        messages: true,
        users: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))

  if (webhooks) res.status(200).send({ webhooks })
}

export const getWebhook: RequestHandler = async (req, res) => {
  const { url } = req.query
  if (!url || typeof url !== "string") {
    handleMissingParameters({ url }, res)
    return
  }
  const webhook = await prisma.webhook
    .findFirst({
      where: {
        url: url,
      },
      include: {
        messages: true,
        users: true,
      },
    })
    .catch((e) => handlePrismaError(e, res))
  if (webhook) res.status(200).send({ webhook })
}
