import { FormType } from "./store"

export type FormData = Record<FormType, {
  buttonText: string;
  title: string;
}>

export const formData: FormData = {
  'login': {
    buttonText: "Регистрация",
    title: "Авторизация",
  },
  'registration': {
    buttonText: "Авторизация",
    title: "Регистрация",
  }
}