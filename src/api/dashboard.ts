import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User } from "../types";

export const getUser = async () => {
  try {
    const { data } = await api.get<User>(`/user`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
