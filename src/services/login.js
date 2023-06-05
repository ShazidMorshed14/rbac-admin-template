import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const signin = async (values) => {
  const { email, password } = values;
  const { data } = await axios.post(`${API_URL}/user/signin`, {
    email: email,
    password: password,
  });
  return data;
};
