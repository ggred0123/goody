export type UserBaseInfo = {
  id: number;
  email: string;
  password: string;
  name: string;
  birthday: Date | null;
  cityId: number | null;
  categoryId: number;
  refreshToken: string | null;
};
