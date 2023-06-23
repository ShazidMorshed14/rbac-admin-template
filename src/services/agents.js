import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";
import { generateUniqueCode } from "../utils/utils";

export const fetchAgents = async (context) => {
  const response = await axios.get(`${API_URL}/agents`, {
    params: {
      agent_code: context.queryKey[1],
      name: context.queryKey[2],
      email: context.queryKey[3],
      contact: context.queryKey[4],
      status: context.queryKey[5],
    },
  });
  return response;
};

export const addNewAgent = async (values) => {
  console.log(values);
  let reqBody = { agent_code: `AG-${generateUniqueCode()}`, ...values };
  const { data } = await axios.post(`${API_URL}/agents/add`, reqBody);
  return data;
};

export const editAgent = async (values) => {
  const { data } = await axios.put(
    `${API_URL}/agents/update/${values._id}`,
    values
  );
  return data;
};

export const deleteAgent = async (values) => {
  const { data } = await axios.delete(`${API_URL}/agents/delete/${values}`);
  return data;
};
