import { FC } from "react"
import { useAppContext } from "./Context"
import NavBar from "./pages/components/NavBar"
import Dashboard from "./pages/Dashboard"

const App: FC = () => {
  const { layout, setLayout } = useAppContext()
  return (
    <div>
      <NavBar layout={layout} setLayout={setLayout} />
      <Dashboard />
    </div>
  )
}
export default App
