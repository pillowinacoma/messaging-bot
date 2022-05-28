import { Webhook } from "@prisma/client"
import { FC } from "react"

import { useForm, SubmitHandler } from "react-hook-form"
import { useAppContext } from "../../Context"
type Inputs = Omit<Webhook, "id"> & {
  userEmail: string
}

interface IWebhookForm {
  id: string
  initialValues?: Inputs
  onSubmit: SubmitHandler<Inputs>
}
const WebhookForm: FC<IWebhookForm> = ({ initialValues, onSubmit, id }) => {
  const { email } = useAppContext()
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      userEmail: email,
      ...initialValues,
    },
  })

  return (
    <div className="modal" id={id}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Register Webhook</h3>


        <label className="label cursor-pointer ">
          <span className="label-text">Name</span>
          <input
            type="text"
            className="input w-full max-w-xs"
            {...register("name")}
          />
        </label>

        <label className="label cursor-pointer ">
          <span className="label-text">Avatar URL</span>
          <input
            type="text"
            className="input w-full max-w-xs"
            {...register("avatar")}
          />
        </label>

        <label className="label cursor-pointer">
          <span className="label-text">URL</span>
          <input
            type="text"
            className="input w-full max-w-xs"
            {...register("url")}
            readOnly={!!initialValues?.url}
          />
        </label>

        <label className="label cursor-pointer ">
          <span className="label-text">Plateform</span>
          <input
            type="text"
            className="input w-full max-w-xs"
            {...register("plateform")}
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

export default WebhookForm
