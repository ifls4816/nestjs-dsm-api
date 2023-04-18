import { Injectable, UnauthorizedException } from "@nestjs/common";
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

  // 此处auth.service中登录调用(auth/login)
  async findOne(userData: any): Promise<User | undefined> {
    return await this.user.findOne({
      where: {
        username: userData.username,
        password: userData.password
      }
    });
  }

  // 新建用户
  async create(createUserDto: CreateUserDto) {
    const data = new User();
    const hasUser = await this.user.findOne({
      where: { username: createUserDto.username }
    });
    if (!hasUser) {
      data.username = createUserDto.username;
      data.password = createUserDto.password;
      data.json = createUserDto.json ?? "";
      return this.user.save(data);
    } else {
      throw new UnauthorizedException({
        message: "用户名已存在"
      });
    }
  }

  // 查询用户信息
  async findUserInfo(userInfo: CreateUserDto) {
    return userInfo;
  }

  // 更改用户信息
  update(id: number, updateUserDto: UpdateUserDto) {
    const updateInfo = {
      username: updateUserDto.username,
      password: updateUserDto.password,
      json: updateUserDto.json
    };
    this.user.update(id, updateInfo);
    return null;
  }

  // 删除用户
  remove(id: number) {
    this.user.delete(id);
    return null;
  }
}
