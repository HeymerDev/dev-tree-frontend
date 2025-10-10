import { isAxiosError } from "axios";
import api from "../config/axios";
import type { EditProfileFormData, EditProfileResponse, User } from "../types";

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

export const updateUser = async (formData: EditProfileFormData) => {
  try {
    const { data } = await api.patch<EditProfileResponse>(`/user`, formData);
    console.log(data);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
