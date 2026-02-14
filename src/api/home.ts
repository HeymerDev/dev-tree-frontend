import { isAxiosError } from "axios";
import api from "../config/axios";
import { type ResponseSearchHandle } from "../types";

export const searchByHandle = async (handle: string) => {
  try {
    const { data } = await api.post<ResponseSearchHandle>(`/search`, {
      handle,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
