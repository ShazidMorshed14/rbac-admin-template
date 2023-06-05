import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const fetchVehicles = async () => {
  const response = await axios.get(`${API_URL}/vehicles`);
  return response;
};
