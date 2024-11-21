export type SignUpData = {
  email: string;
  password: string;
  name: string;
  birthday?: Date | null;
  categoryId: number;
  cityId?: number | null;
};
