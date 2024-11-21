import { ApiProperty } from '@nestjs/swagger';
import { from } from 'form-data';
import { UserData } from '../type/user-data.type';
export class UserDto {
    @ApiProperty({
        description: '유저 ID',
        type: Number,
    })
    id!: number;

    @ApiProperty({
        description: '유저 이름',
        type: String,
    })
    name!: string;

    @ApiProperty({
        description: '유저 이메일',
        type: String,
    })
    email!: string;

    @ApiProperty({
        description: '유저 생일',
        type: Date,
        nullable: true,
    })
    birthday!: Date | null;

    @ApiProperty({
        description: '도시 ID',
        type: Number,
        nullable: true,
    })
    cityId!: number | null;

    @ApiProperty({
        description: '카테고리 ID',
        type: Number,
    })
    categoryId!: number;

    static from(user: UserData): UserDto {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            cityId: user.cityId,
            categoryId: user.categoryId,
        };
    }

    static fromArray(users: UserData[]): UserDto[] {
        return users.map((user) => UserDto.from(user));
    }
}

export class UserListDto {
    @ApiProperty({
        description: '유저 목록',
        type: [UserDto],
    })
    users!: UserDto[];

    static from(users: UserData[]): UserListDto {
        return {
            users: UserDto.fromArray(users),
        };
    }
}
