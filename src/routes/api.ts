import express from "express"
import { createMessage, deleteMessage } from "./message-functions"
import { getUserMessages, getUserMessagesByWebhook, getUserWebhooks, login } from "./user-functions"
import {
  createWebhook,
  deleteWebhook,
  getWebhook,
  getWebhooks,
  updateWebhook,
} from "./webhook-functions"

const router = express.Router()

router.get("/login", login)

router.post("/webhook", createWebhook)
router.put("/webhook", updateWebhook)
router.delete("/webhook", deleteWebhook)
router.get("/webhook", getWebhook)
router.get("/webhooks", getWebhooks)

router.post("/message", createMessage)
router.delete("/message", deleteMessage)

router.get("/user/messages", getUserMessages)
router.get("/user/messagesByWebhook", getUserMessagesByWebhook)
router.get("/user/webhooks", getUserWebhooks)

export default router
