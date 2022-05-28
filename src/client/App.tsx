import { FC, useState } from "react"
import NavBar from "./pages/components/NavBar"
import Dashboard from "./pages/Dashboard"

export type LayoutType = "webhooks" | "messages"
const App: FC = () => {
  const [layout, setLayout] = useState<LayoutType>("webhooks")
  return (
    <div>
      <NavBar layout={layout} setLayout={setLayout} />
      <Dashboard layout={layout} />
    </div>
  )
}
export default App
