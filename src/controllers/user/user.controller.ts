import { Body, Controller, Get, Post } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { User } from "../../module/users/entities/user.entity";
import { UsersService } from "../../service/user/user.service";
import { UserDto } from "../../models/user";

@Crud({
  model: {
    type: User,
  },
})
@Controller("/users")
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Get("/get-all")
  async getAll(): Promise<any> {
    return await this.service.find();
  }

  @Post("/create-user")
  async createUser(@Body() user: User): Promise<UserDto> {
    const users = await this.service.create(user);
    return users;
  }
}
