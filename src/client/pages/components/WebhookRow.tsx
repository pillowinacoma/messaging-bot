import { Webhook } from "@prisma/client"
import { FC } from "react"
import { useAppContext } from "../../Context"
import {
  createMessage,
  deleteWebhook,
  getUserMessages,
  getUserWebhooks,
  updateWebhook,
} from "../../utils"
import MessageForm from "./MessageForm"
import WebhookForm from "./WebhookForm"

interface IWebhookRow {
  webhook: Webhook
}
const WebhookRow: FC<IWebhookRow> = ({ webhook }) => {
  const { plateform, url, id, name, avatar } = webhook
  const { email, setWebhooks, setMessages } = useAppContext()
  const onSubmit = (data) => {
    updateWebhook(data, (_) =>
      getUserWebhooks({ userEmail: email }, ({ webhooks }) =>
        setWebhooks(webhooks)
      )
    )
  }
  const onDelete = () => {
    deleteWebhook({ url }, (_) =>
      getUserWebhooks({ userEmail: email }, ({ webhooks }) =>
        setWebhooks(webhooks)
      )
    )
  }

  const onSendMessage = ({ content }) => {
    fetch(url, {
      method: "post",
      body: JSON.stringify({
        userName: name,
        avatar_url: new URL(avatar),
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((a) => {
        console.log(a)

        createMessage({ userEmail: email, content, url, success: a.ok }, () =>
          getUserMessages({ userEmail: email }, ({ messages }) =>
            setMessages(messages)
          )
        )
      })
      .catch((err) => {
        console.log(err)
        createMessage({ userEmail: email, content, url, success: false }, () =>
          getUserMessages({ userEmail: email }, ({ messages }) =>
            setMessages(messages)
          )
        )
      })
  }

  return (
    <>
      <tr>
        <td>
          <a href={`#edit-webhook-${id}`} className="btn w-full">
            Edit
          </a>
          <WebhookForm
            id={`edit-webhook-${id}`}
            onSubmit={onSubmit}
            initialValues={{ plateform, url, userEmail: email, name, avatar }}
          />
        </td>
        <td>
          <a className="btn w-full" onMouseDown={onDelete}>
            Delete
          </a>
        </td>
        <td>
          <a href={`#send-message-to-webhook-${id}`} className="btn w-full">
            Message
          </a>
          <MessageForm
            id={`send-message-to-webhook-${id}`}
            onSubmit={onSendMessage}
          />
        </td>
        <th>{id}</th>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {avatar && (
                <img src={avatar} alt="Avatar Tailwind CSS Component" />
              )}
            </div>
          </div>
        </td>
        <td>{name}</td>
        <td>{url}</td>
        <td>{plateform}</td>
      </tr>
    </>
  )
}
export default WebhookRow
