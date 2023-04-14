import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Like, Repository } from "typeorm";

// export type User = any;

export interface UesrParams {
  username: string;
  pass: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  async findOne(userData: any): Promise<User | undefined> {
    console.log("userData", userData);
    return await this.user.findOne(userData);
  }

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    data.json = createUserDto.json ?? "";
    return this.user.save(data);
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
