import { FC } from "react"
import { useAppContext } from "./Context"
import NavBar from "./pages/components/NavBar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { createUser, loginUser } from "./utils"

const App: FC = () => {
  const { layout, setLayout, email, setEmail } = useAppContext()
  return (
    <>
      {email !== "" ? (
        <div>
          <NavBar layout={layout} setLayout={setLayout} />
          <Dashboard />
        </div>
      ) : (
        <div className="grid place-items-center h-screen">
          <Login
            submitButtonName="Login"
            hidePassWord
            onSubmit={(params) =>
              loginUser(params, ({ userEmail }: { userEmail: string }) =>
                setEmail(userEmail)
              )
            }
          />
          <Login
            submitButtonName="create account"
            onSubmit={(params) =>
              createUser(params, ({ userEmail }: { userEmail: string }) =>
                setEmail(userEmail)
              )
            }
          />
        </div>
      )}
    </>
  )
}
export default App
