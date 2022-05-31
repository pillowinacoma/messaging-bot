import { Message, Webhook } from "@prisma/client"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"
import { MessageWithWebhook } from "./utils"

export type LayoutType = "webhooks" | "messages"
export interface Context {
  email: string
  setEmail: (val: string) => void
  setWebhooks: Dispatch<SetStateAction<Webhook[]>>
  setMessages: Dispatch<SetStateAction<MessageWithWebhook[]>>
  setLayout: Dispatch<SetStateAction<LayoutType>>
  webhooks: Webhook[]
  messages: MessageWithWebhook[]
  layout: LayoutType
}
const defaultVal = {
  email: "",
  setEmail: () => null,
  setWebhooks: () => null,
  setMessages: () => null,
  setLayout: () => null,
  webhooks: [],
  messages: [],
  layout: "webhooks",
} as Context

const context = React.createContext(defaultVal)

const { Provider } = context

export const ContextWrapper = ({ children }: { children: any }) => {
  const [email, setEmail] = useState(defaultVal.email)
  const [webhooks, setWebhooks] = useState(defaultVal.webhooks)
  const [messages, setMessages] = useState<MessageWithWebhook[]>(defaultVal.messages)
  const [layout, setLayout] = useState<LayoutType>("webhooks")
  return (
    <Provider
      value={{
        email,
        setEmail,
        webhooks,
        messages,
        setMessages,
        setWebhooks,
        layout,
        setLayout,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppContext = (): Context => useContext(context)
