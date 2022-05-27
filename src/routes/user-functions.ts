import { RequestHandler } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const login: RequestHandler = async (req, res) => {
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
