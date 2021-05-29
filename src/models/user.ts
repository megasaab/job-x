import { IsEmail, IsNotEmpty } from "class-validator";
import Address from "../module/users/entities/address.entity";

export class  UserDto {
  @IsNotEmpty()  id: string;
  @IsNotEmpty()  username: string;
  @IsNotEmpty()  @IsEmail()  email: string;
  @IsNotEmpty()  address: Address;
}


export class CreateUserDto {
  @IsNotEmpty()  username: string;
  @IsNotEmpty()  password: string;
  @IsNotEmpty()  @IsEmail()  email: string;
  @IsNotEmpty()  address: Address;
}


export class LoginUserDto {
  @IsNotEmpty()  readonly username: string;
  @IsNotEmpty()  readonly password: string;
}
