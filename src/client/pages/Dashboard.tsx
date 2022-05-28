import { FC, useEffect } from "react"
import { useAppContext } from "../Context"
import { getUserMessages, getUserWebhooks } from "../utils"
import MessagesTable from "./components/MessagesTable"
import WebhookTable from "./components/WebhookTable"

const Dashboard: FC = () => {
  const { email, setWebhooks, messages, setMessages, webhooks, layout } =
    useAppContext()

  useEffect(() => {
    getUserWebhooks({ userEmail: email }, ({ webhooks }) =>
      setWebhooks(webhooks)
    )
  }, [])
  useEffect(() => {
    getUserMessages({ userEmail: email }, ({ messages }) =>
      setMessages(messages)
    )
  }, [])

  return (
    <div>
      {layout === "messages" && (
        <div>
          <MessagesTable messages={messages} />
        </div>
      )}
      {layout === "webhooks" && (
        <div>
          <WebhookTable webhooks={webhooks} />
        </div>
      )}
    </div>
  )
}
export default Dashboard
