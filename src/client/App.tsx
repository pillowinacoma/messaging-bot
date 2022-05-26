import { FC, useState } from "react"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"

const App: FC = () => {
  const [logged, setLogged] = useState(false)

  return (
    <div>
      {!logged ? <Login onLogin={() => setLogged(true)} /> : <Dashboard />}
    </div>
  )
}
export default App
