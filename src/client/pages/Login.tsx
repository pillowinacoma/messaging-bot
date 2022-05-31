import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface Inputs {
  userEmail: string
  password: string
}
interface ILogin {
  onSubmit: SubmitHandler<Inputs>
  submitButtonName: string
  hidePassWord?: boolean
}
const Login: FC<ILogin> = ({ onSubmit, submitButtonName, hidePassWord }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  return (
    <div className="w-1/2 flex flex-col justify-center content-center bg-slate-800">
      <label className="label cursor-pointer">
        <span className="label-text">email</span>
        <input
          type="text"
          className="input w-full max-w-xs"
          {...register("userEmail")}
          required
        />
      </label>
      {errors.userEmail && <span className="badge-warning">required</span>}
      <label className="label cursor-pointer">
        <span className="label-text">password</span>
        <input
          type={hidePassWord ? "password" : "text"}
          className="input w-full max-w-xs"
          {...register("password")}
          required
        />
      </label>
      {errors.password && <span className="badge-warning">required</span>}
      <button
        className="btn btn-primary"
        type="submit"
        onMouseDown={handleSubmit(
          (data) => data.password && data.userEmail && onSubmit(data)
        )}
      >
        {submitButtonName}
      </button>
    </div>
  )
}
export default Login
