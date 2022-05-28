import { Message, Webhook } from "@prisma/client"
export type MessageWithWebhook = Message & { webhook: Webhook }

const baseApiURL = `${location.origin}/api`

const getData = (
  endPoint: string,
  params: Record<string, string>,
  execAfterLoad: (data: any) => void
) => {
  const url = new URL(baseApiURL + endPoint)
  Object.keys(params).forEach((k) => url.searchParams.append(k, params[k]))
  fetch(url)
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
  execAfterLoad: (data: { messages: MessageWithWebhook[] }) => void
): void => getData("/user/messages", params, execAfterLoad)

type HTTPMethod = "post" | "delete" | "put"
const mutateData = (
  method: HTTPMethod,
  endPoint: string,
  params: Record<string, string | boolean>,
  execAfterLoad?: (data: any) => void,
  urlToFetch?: string
) => {
  const url = urlToFetch ? new URL(urlToFetch) : new URL(baseApiURL + endPoint)
  fetch(url, {
    method,
    body: JSON.stringify(params),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        if (execAfterLoad) execAfterLoad(result)
      },
      (err) => {
        console.warn(err)
      }
    )
}

export const createWebhook = (
  params: {
    userEmail: string
    plateform: string
    isPublic: boolean
    url: string
  },
  execAfterLoad: (data: { webhook: Webhook }) => void
): void => mutateData("post", "/webhook", params, execAfterLoad)

export const updateWebhook = (
  params: {
    userEmail: string
    plateform: string
    isPublic: boolean
    url: string
  },
  execAfterLoad: (data: { webhook: Webhook }) => void
): void => mutateData("put", "/webhook", params, execAfterLoad)

export const deleteWebhook = (
  params: {
    url: string
  },
  execAfterLoad: (data: { webhook: Webhook }) => void
): void => mutateData("delete", "/webhook", params, execAfterLoad)

export const createMessage = (
  params: {
    userEmail: string
    content: string
    url: string
    success: boolean
  },
  execAfterLoad: (data: Message) => void
): void => mutateData("post", "/message", params, execAfterLoad)
