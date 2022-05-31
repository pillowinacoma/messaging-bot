import { FC } from "react"
import { LayoutType, useAppContext } from "../../Context"

interface INavBar {
  layout: LayoutType
  setLayout: (e: LayoutType) => void
}
const NavBar: FC<INavBar> = ({ layout, setLayout }) => {
  const { setEmail } = useAppContext()
  const possibleLayouts: LayoutType[] = ["messages", "webhooks"]
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {possibleLayouts.map((pl) => (
              <li>
                <a onClick={() => setLayout(pl)}>{pl}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center card-title">{layout}</div>
      <div className="navbar-end">
        <button onMouseDown={() => setEmail("")} className="btn  btn-warning">
          Disconnect
        </button>
      </div>
    </div>
  )
}
export default NavBar
