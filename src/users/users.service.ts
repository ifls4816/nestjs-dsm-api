import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Like, Not, Repository } from "typeorm";

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

  async create(createUserDto: CreateUserDto) {
    // console.log("createUserDto", createUserDto);
    // return this.user.find({
    //   where: {
    //     username: Like(`%${"zs"}%`)
    //   }
    // });
    // return;
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    data.json = createUserDto.json ?? "";
    return this.user.save(data);
  }

  async findAll() {
    const dt = await this.user.find({
      where: {
        id: 3
      }
    });
    console.log(dt);
    return;
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
