import { Webhook } from "@prisma/client"
import { FC } from "react"
import WebhookRow from "./WebhookRow"
import { createWebhook, getUserWebhooks } from "../../utils"
import WebhookForm from "./WebhookForm"
import { useAppContext } from "../../Context"

interface IWebhookTable {
  webhooks: Webhook[]
}
const WebhookTable: FC<IWebhookTable> = ({ webhooks }) => {
  const { email, setWebhooks } = useAppContext()
  const onSubmit = (data) => {
    createWebhook(data, (_) =>
      getUserWebhooks({ userEmail: email }, ({ webhooks }) =>
        setWebhooks(webhooks)
      )
    )
  }
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>id</th>
              <th>avatar</th>
              <th>name</th>
              <th>URL</th>
              <th>Platform</th>
            </tr>
          </thead>
          <tbody>
            {webhooks
              .sort((a, b) => a.id - b.id)
              .map((wh) => (
                <WebhookRow webhook={wh} />
              ))}
            <tr>
              <td colSpan={8}>
                <a href="#create-webhook" className="btn w-full">
                  Add Webhook
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <WebhookForm id="create-webhook" onSubmit={onSubmit} />
    </>
  )
}
export default WebhookTable
