import { Webhook } from "@prisma/client"
import { FC } from "react"
import WebhookRow from "./WebhookRow"

interface IWebhookTable {
  webhooks: Webhook[]
}
const WebhookTable: FC<IWebhookTable> = ({ webhooks }) => {
  return (
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
            <button className="btn col-span-4 bg-center">+</button>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default WebhookTable
