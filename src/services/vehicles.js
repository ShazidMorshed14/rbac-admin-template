import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const fetchVehicles = async () => {
  const response = await axios.get(`${API_URL}/vehicles`);
  return response;
};

export const addVehicle = async (values) => {
  console.log(values);
  const { data } = await axios.post(`${API_URL}/vehicles/add`, values);
  return data;
};

export const updateVehicle = async (values) => {
  const { data } = await axios.put(
    `${API_URL}/vehicles/update/${values.id}`,
    values
  );
  return data;
};

export const deleteVehicle = async (values) => {
  const { data } = await axios.delete(`${API_URL}/vehicles/delete/${values}`);
  return data;
};
