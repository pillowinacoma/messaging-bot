import { Message, Webhook } from "@prisma/client"

const baseApiURL = `${location.origin}/api`

const getData = (
  endPoint: string,
  params: Record<string, string>,
  execAfterLoad: (data: any) => void
) => {
  const url = new URL(baseApiURL + endPoint)
  Object.keys(params).forEach((k) => url.searchParams.append(k, params[k]))
  fetch(url, {})
    .then((res) => res.json())
    .then(
      (result) => {
        execAfterLoad(result)
      },
      (err) => {
        console.warn(err)
      }
    )
}

export const getWebHook = (
  params: { url: string },
  execAfterLoad: (data: { webhook: Webhook }) => void
): void => getData("/webhook", params, execAfterLoad)

export const getUserWebhooks = (
  params: { userEmail: string },
  execAfterLoad: (data: { webhooks: Webhook[] }) => void
): void => getData("/user/webhooks", params, execAfterLoad)

export const getUserMessagesByWebhook = (
  params: { userEmail: string; url: string },
  execAfterLoad: (data: { messages: Message[] }) => void
): void => getData("/user/messagesByWebhook", params, execAfterLoad)

export const getUserMessages = (
  params: { userEmail: string },
  execAfterLoad: (data: { messages: Message[] }) => void
): void => getData("/user/messages", params, execAfterLoad)
