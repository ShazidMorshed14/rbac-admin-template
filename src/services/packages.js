import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const fetchPackages = async (context) => {
  const response = await axios.get(`${API_URL}/packages`, {
    params: {
      _id: context.queryKey[1],
      name: context.queryKey[2],
      isActive: context.queryKey[3],
      vehicleId: context.queryKey[4],
      vehicleModelId: context.queryKey[5],
    },
  });
  return response;
};

export const addPackage = async (values) => {
  console.log(values);
  const { data } = await axios.post(`${API_URL}/packages/add`, values);
  return data;
};

export const updatePackage = async (values) => {
  const { data } = await axios.put(
    `${API_URL}/packages/update/${values.id}`,
    values
  );
  return data;
};

export const deletePackage = async (values) => {
  const { data } = await axios.delete(`${API_URL}/packages/delete/${values}`);
  return data;
};
