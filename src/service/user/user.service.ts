import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../module/users/entities/user.entity";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CreateUserDto, LoginUserDto, UserDto } from "../../models/user";
import { toUserDto } from "../../shared/mapper";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new HttpException('Error while compare passwords', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where:  { username } });
  }

  async create(userDto: CreateUserDto): Promise<any> {
    const { username, password, email, address } = userDto;

    // check if the user exists in the db
    const userInDb = await this.usersRepository.findOne({
      where: { username }
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.usersRepository.create({ username, password, email, address});
    await this.usersRepository.save(user);
    return toUserDto(user);
  }
}
