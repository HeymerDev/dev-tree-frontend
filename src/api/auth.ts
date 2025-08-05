import { isAxiosError } from "axios";
import api from "../config/axios";

import type { LoginFormData, RegisterFormData } from "../types";
import { toast } from "sonner";

export const registerUser = async (
  formData: RegisterFormData,
  reset: () => void
) => {
  try {
    const {
      data: { message },
    } = await api.post(`/auth/register`, formData);
    toast.success(message);
    reset();
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};

export const loginUser = async (formData: LoginFormData) => {
  try {
    const {
      data: { token },
    } = await api.post(`/auth/login`, formData);
    localStorage.setItem("AUTH_TOKEN", token);
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message);
    }
  }
};
