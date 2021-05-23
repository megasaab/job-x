import { UserDto } from "../models/user";
import { User } from "../module/users/entities/user.entity";

export const toUserDto = (data: User): UserDto => {
  const { id, username, email } = data;
  let userDto: UserDto = { id, username, email };
  return userDto;
};
