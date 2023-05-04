import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
// import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { UserRequest } from "../users/types/User";
import { CreateUserDto } from "../users/dto/create-user.dto";

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

  async login(req: UserRequest, createUserDto: CreateUserDto) {
    const err = (message: string) => {
      throw new UnauthorizedException({ message });
    };
    if (!(req.session as any).code) {
      err("session验证码错误");
    }
    if (!createUserDto.code) {
      err("请输入验证码");
    }
    const code: string = (req.session as any).code?.toLocaleLowerCase();
    console.log(createUserDto);
    if (createUserDto?.code !== code) {
      err("验证码错误");
    }

    const payload = { ...req.user };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: `Bearer ${token}`
    };
  }
}
