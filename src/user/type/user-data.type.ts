export type UserData = {
    id: number;
    name: string;
    email: string;
    birthday: Date | null;
    cityId: number | null;
    categoryId: number;
    password?: string;
    refreshToken?: string | null;
};
