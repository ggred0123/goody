export type UpdateUserData = {
  email?: string;
  password?: string;
  name?: string;
  birthday?: Date | null;
  categoryId?: number;
  cityId?: number | null;
  refreshToken?: string | null;
};
