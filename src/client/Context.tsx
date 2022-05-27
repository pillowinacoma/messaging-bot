import React, { useContext, useState } from "react"

export interface Context {
  email: string
  setEmail: (val: string) => void
}
const defaultVal = {
  email: "user@user.com",
  setEmail: () => null,
} as Context

const context = React.createContext(defaultVal)

const { Provider } = context

export const ContextWrapper = ({ children }: { children: any }) => {
  const [email, setEmail] = useState(defaultVal.email)
  return <Provider value={{ email, setEmail }}>{children}</Provider>
}

export const useAppContext = (): Context => useContext(context)
