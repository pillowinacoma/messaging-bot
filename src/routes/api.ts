import express from "express"
import { login } from "./user-functions"
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

// TODO
// Login
// CRUD webhook
// Send Message

export default router
