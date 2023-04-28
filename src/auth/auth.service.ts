import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ username, password });
    if (user && user.password === password) {
      // 删除password字段 不做返回
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { ...user };
    console.log(payload);
    const token = this.jwtService.sign(payload);
    return {
      accessToken: `Bearer ${token}`
    };
  }
}
