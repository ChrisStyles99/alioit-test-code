import { toast } from "react-toastify"

export const socketToast = (msg, type) => {
  toast(msg, {
    theme: 'colored',
    type
  })
}