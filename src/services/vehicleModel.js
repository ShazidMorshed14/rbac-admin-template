import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const fetchVehicleModel = async (context) => {
  const response = await axios.get(`${API_URL}/models`, {
    params: {
      _id: context.queryKey[1],
      name: context.queryKey[2],
      vehicleId: context.queryKey[3],
      vehicleModelId: context.queryKey[4],
    },
  });
  return response;
};

export const addVehicleModel = async (values) => {
  console.log(values);
  const { data } = await axios.post(`${API_URL}/models/add`, values);
  return data;
};

export const updateVehicleModel = async (values) => {
  const { data } = await axios.put(
    `${API_URL}/models/update/${values.id}`,
    values
  );
  return data;
};

export const deleteVehicleModel = async (values) => {
  const { data } = await axios.delete(`${API_URL}/models/delete/${values}`);
  return data;
};

//_id, name, vehicleId, vehicleModelId
