import { Webhook } from "@prisma/client"
import { FC } from "react"

interface IWebhookRow {
  webhook: Webhook
  updateWebhook?: (params: Webhook) => void
}
const WebhookRow: FC<IWebhookRow> = ({ webhook }) => {
  const { plateform, public: isPublic, url, id } = webhook
  return (
    <tr>
      <th>{id}</th>
      <td>{url}</td>
      <td>{plateform}</td>
      <td>
        <input type="checkbox" readOnly checked={isPublic} />
      </td>
    </tr>
  )
}
export default WebhookRow
