import { FC } from "react"

import { useForm, SubmitHandler } from "react-hook-form"
type Inputs = {
  content: string
}

interface IMessageForm {
  id: string
  onSubmit: SubmitHandler<Inputs>
}
const MessageForm: FC<IMessageForm> = ({ onSubmit, id }) => {
  const { register, handleSubmit } = useForm<Inputs>()

  return (
    <div className="modal" id={id}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Message</h3>

        <label className="label cursor-pointer">
          <span className="label-text">content</span>
          <input
            type="text"
            className="input w-full max-w-xs"
            {...register("content")}
          />
        </label>

        <div className="modal-action" onMouseDown={handleSubmit(onSubmit)}>
          <a href="#" className="btn">
            Submit
          </a>
        </div>
        <div className="modal-action">
          <a href="#" className="btn">
            Cancle
          </a>
        </div>
      </div>
    </div>
  )
}

export default MessageForm
