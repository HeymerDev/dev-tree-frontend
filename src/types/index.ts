export type User = {
  username: string;
  email: string;
  handle: string;
  _id: string;
  description?: string;
  imageUrl: string;
  links: string;
};

export type RegisterFormData = Pick<User, "username" | "email" | "handle"> & {
  password: string;
  password_confirmation: string;
};

export type LoginFormData = Pick<User, "email"> & {
  password: string;
};

export type EditProfileFormData = Pick<User, "handle" | "description">;

export type EditProfileResponse = {
  message: string;
};

export type SocialNetwork = {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Omit<SocialNetwork, "id">;
