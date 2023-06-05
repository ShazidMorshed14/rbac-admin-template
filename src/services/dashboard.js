import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const fetchAdminStats = async (context) => {
  const response = await axios.get(`${API_URL}/dashboard`, {
    params: {
      type: context.queryKey[1],
    },
  });
  return response;
};
