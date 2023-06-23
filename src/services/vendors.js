import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";
import { generateUniqueCode } from "../utils/utils";

export const fetchVendors = async (context) => {
  const response = await axios.get(`${API_URL}/vendors`, {
    params: {
      vendor_code: context.queryKey[1],
      name: context.queryKey[2],
      email: context.queryKey[3],
      contact: context.queryKey[4],
      status: context.queryKey[5],
    },
  });
  return response;
};

export const addNewVendor = async (values) => {
  console.log(values);
  let reqBody = { vendor_code: `VN-${generateUniqueCode()}`, ...values };
  const { data } = await axios.post(`${API_URL}/vendors/add`, reqBody);
  return data;
};

export const editVendor = async (values) => {
  const { data } = await axios.put(
    `${API_URL}/vendors/update/${values._id}`,
    values
  );
  return data;
};

export const deleteVendor = async (values) => {
  const { data } = await axios.delete(`${API_URL}/vendors/delete/${values}`);
  return data;
};
