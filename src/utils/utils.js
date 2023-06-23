import { toast } from "react-toastify";
import { NotificationUtil } from "./notifications";

export const handleErrorResponse = (err) => {
  const { data } = err.response;

  //   NotificationUtil({
  //     success: false,
  //     title: "Something went wrong!",
  //     message: data.message,
  //   });
  toast.error(data.message);
};

export const isArrayAndHasContent = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

export function generateUniqueCode() {
  let characters = "0123456789";
  let code = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
    characters =
      characters.slice(0, randomIndex) + characters.slice(randomIndex + 1);
  }

  return code;
}
