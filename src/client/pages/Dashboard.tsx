import { Message, Webhook } from "@prisma/client"
import { FC, useEffect, useState } from "react"
import { LayoutType } from "../App"
import { useAppContext } from "../Context"
import { getUserMessages, getUserWebhooks } from "../utils"
import WebhookTable from "./components/WebhookTable"

interface IDashboard {
  layout: LayoutType
}
const Dashboard: FC<IDashboard> = ({ layout }) => {
  const { email, setWebhooks, webhooks } = useAppContext()

  useEffect(() => {
    getUserWebhooks({ userEmail: email }, ({ webhooks }) =>
      setWebhooks(webhooks)
    )
  }, [])

  return (
    <div>
      {layout === "webhooks" && (
        <div>
          <WebhookTable webhooks={webhooks} />
        </div>
      )}
    </div>
  )
}
export default Dashboard
