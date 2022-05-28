import { Webhook } from "@prisma/client"
import { FC } from "react"
import WebhookRow from "./WebhookRow"
import { createWebhook } from "../../utils"
import WebhookForm from "./WebhookForm"

interface IWebhookTable {
  webhooks: Webhook[]
}
const WebhookTable: FC<IWebhookTable> = ({ webhooks }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>URL</th>
              <th>Platform</th>
              <th>Public</th>
            </tr>
          </thead>
          <tbody>
            {webhooks.map((wh) => (
              <WebhookRow webhook={wh} />
            ))}
            <tr>
              <td colSpan={4}>
                <a href="#my-modal-2" className="btn w-full">
                  open modal
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <WebhookForm />
    </>
  )
}
export default WebhookTable
