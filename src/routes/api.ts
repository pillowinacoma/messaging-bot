import express, { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

const getApi: RequestHandler = async (_, res) => {
  const allUsers = await prisma.user.findMany({
    include: { messages: true },
  })
  const allMessages = await prisma.message.findMany()
  res.send({ allMessages, allUsers })
}

router.get("/", getApi)

// TODO
// Login
// CRUD webhook
// Send Message

export default router
