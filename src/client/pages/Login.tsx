import { FC } from "react"

interface ILogin {
  onLogin: () => void
}
const Login: FC<ILogin> = ({ onLogin }) => {
  return (
    <form onSubmit={() => onLogin()}>
      <input type="text" />
      <button type="submit">login</button>
    </form>
  )
}
export default Login
