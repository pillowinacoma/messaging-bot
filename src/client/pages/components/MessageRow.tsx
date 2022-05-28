import { Message, Webhook } from "@prisma/client"
import { FC } from "react"

interface IWebhookRow {
  message: Message & { webhook: Webhook }
}
const MessageRow: FC<IWebhookRow> = ({ message }) => {
  console.log(message)

  const { id, content, success, webhook } = message

  return (
    <>
      <tr>
        <th>{id}</th>
        <td>{content}</td>
        <td>
          <input type="checkbox" readOnly checked={success} />
        </td>
        <td>{webhook.name}</td>
      </tr>
    </>
  )
}
export default MessageRow
