import express from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const router = express.Router()

router.get("/", async (_, res) => {
  const allUsers = await prisma.user.findMany({
    include: { messages: true },
  })
  // use `console.dir` to print nested objects
  console.dir({ allUsers }, { depth: null })
  const allMessages = await prisma.message.findMany()

  console.dir({ allMessages }, { depth: null })

  res.send({ allMessages, allUsers })
})

// app.get("/", async (_, res) => {
// })
export default router
