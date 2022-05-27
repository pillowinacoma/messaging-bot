import express, { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"
import {
  createWebhook,
  deleteWebhook,
  getWebhook,
  getWebhooks,
  updateWebhook,
} from "./webhook-functions"

const prisma = new PrismaClient()
const router = express.Router()

const getApi: RequestHandler = async (_, res) => {
  const allUsers = await prisma.user.findMany({
    include: { messages: true },
  })
  const allMessages = await prisma.message.findMany()
  res.send({ allMessages, allUsers })
}
const login: RequestHandler = async (req, res) => {
  const userEmail = req.body.email

  if (!userEmail) res.status(400).send() //Bad request
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  })
  if (!user) res.status(401).send() // Unauthorised
  res.status(200).send()
}

router.get("/", getApi)
router.get("/login", login)
router.post("/webhook", createWebhook)
router.put("/webhook", updateWebhook)
router.delete("/webhook", deleteWebhook)
router.get("/webhook", getWebhook)
router.get("/webhooks", getWebhooks)

// TODO
// Login
// CRUD webhook
// Send Message

export default router
