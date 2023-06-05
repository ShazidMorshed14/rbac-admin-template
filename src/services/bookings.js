import { toast } from "react-toastify";
import { API_URL } from "./helper";
import axios from "axios";
import { NotificationUtil } from "../utils/notifications";

export const fetchBookings = async (context) => {
  const response = await axios.get(`${API_URL}/bookings`, {
    params: {
      id: context.queryKey[1],
      name: context.queryKey[2],
      email: context.queryKey[3],
      contact: context.queryKey[4],
      status: context.queryKey[5],
    },
  });
  return response;
};

export const updateBooking = async (values) => {
  const { id, status } = values;
  const { data } = await axios.put(`${API_URL}/bookings/update/${id}`, {
    status: status,
  });
  return data;
};

export const updateCallBooking = async (values) => {
  const { id, status } = values;
  const { data } = await axios.put(`${API_URL}/callbookings/update/${id}`, {
    status: status,
  });
  return data;
};

export const fetchCallBookings = async (context) => {
  const response = await axios.get(`${API_URL}/callbookings`, {
    params: {
      id: context.queryKey[1],
      contact: context.queryKey[2],
      status: context.queryKey[3],
    },
  });
  return response;
};

export const initiateBooking = async (values) => {
  const response = await axios.post(`${API_URL}/bookings/add`, values);
  return response;
};
