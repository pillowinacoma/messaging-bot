import { Message, Webhook } from "@prisma/client"
import React, { Dispatch, SetStateAction, useContext, useState } from "react"

export interface Context {
  email: string
  setEmail: (val: string) => void
  setWebhooks: Dispatch<SetStateAction<Webhook[]>>
  setMessages: Dispatch<SetStateAction<Message[]>>
  webhooks?: Webhook[]
  messages?: Message[]
}
const defaultVal = {
  email: "user@user.com",
  setEmail: () => null,
  setWebhooks: () => null,
  setMessages: () => null,
  webhooks: [],
  messages: [],
} as Context

const context = React.createContext(defaultVal)

const { Provider } = context

export const ContextWrapper = ({ children }: { children: any }) => {
  const [email, setEmail] = useState(defaultVal.email)
  const [webhooks, setWebhooks] = useState(defaultVal.webhooks)
  const [messages, setMessages] = useState(defaultVal.messages)
  return (
    <Provider
      value={{ email, setEmail, webhooks, messages, setMessages, setWebhooks }}
    >
      {children}
    </Provider>
  )
}

export const useAppContext = (): Context => useContext(context)
