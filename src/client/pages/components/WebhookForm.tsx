import { Webhook } from "@prisma/client"
import { FC } from "react"

import { useForm, SubmitHandler } from "react-hook-form"
import { useAppContext } from "../../Context"
import { createWebhook, getUserWebhooks } from "../../utils"
type Inputs = Omit<Webhook, "id" | "public"> & {
  isPublic: boolean
  userEmail: string
}

const WebhookForm: FC = () => {
  const { email, setWebhooks } = useAppContext()
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      userEmail: email,
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createWebhook(data, (_) =>
      getUserWebhooks({ userEmail: email }, ({ webhooks }) =>
        setWebhooks(webhooks)
      )
    )
  }

  return (
    <div className="modal" id="my-modal-2">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Register Webhook</h3>

        <label className="label cursor-pointer">
          <span className="label-text">URL</span>
          <input
            type="text"
            className="input w-full max-w-xs"
            {...register("url")}
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

        <label className="label cursor-pointer ">
          <span className="label-text">Public ?</span>
          <input
            type="checkbox"
            className="checkbox"
            {...register("isPublic")}
          />
        </label>

        <div className="modal-action" onMouseDown={handleSubmit(onSubmit)}>
          <a href="#" className="btn">
            Yay!
          </a>
        </div>
      </div>
    </div>
  )
}

export default WebhookForm
