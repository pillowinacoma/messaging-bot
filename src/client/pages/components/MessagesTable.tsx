import { Message, Webhook } from "@prisma/client"
import { FC } from "react"
import MessageRow from "./MessageRow"

interface IWebhookTable {
  messages: Array<Message & { webhook: Webhook }>
}
const MessagesTable: FC<IWebhookTable> = ({ messages }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>id</th>
              <th>Content</th>
              <th>Success</th>
              <th>Webhook</th>
            </tr>
          </thead>
          <tbody>
            {messages
              .sort((a, b) => a.id - b.id)
              .map((msg) => (
                <MessageRow message={msg} />
              ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
export default MessagesTable
