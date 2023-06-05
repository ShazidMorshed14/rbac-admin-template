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
