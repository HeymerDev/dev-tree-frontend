export type User = {
  username: string;
  email: string;
  handle: string;
};

export type RegisterFormData = Pick<User, "username" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginFormData = Pick<User, "email"> & {
  password: string;
};
