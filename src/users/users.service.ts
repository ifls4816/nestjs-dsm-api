import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Response, Request } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { /**Like, Not, */ Repository } from "typeorm";
import { UesrParams } from "../users/types/User";
import { drawCaptcha } from "../common/index";
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) {}

  // 此处auth.service中登录调用(auth/login)
  async findOne(userData: UesrParams): Promise<User | undefined> {
    return await this.user.findOne({
      where: {
        username: userData.username,
        password: userData.password
      }
    });
  }

  // 获取验证码
  async getCaptcha(req: Request, res: Response) {
    const captcha = drawCaptcha();
    (req.session as any).code = captcha.text;
    res.type("image/svg+xml");
    res.send(captcha.data);
  }

  // 新建用户
  async create(req: Request, createUserDto: CreateUserDto) {
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
    if (createUserDto?.code !== code) {
      err("验证码错误");
    }
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
      err("用户名已存在");
    }
  }

  // 查询用户信息
  async findUserInfo(userInfo: CreateUserDto) {
    return userInfo;
  }

  // 更改用户信息
  update(user: UpdateUserDto, updateUserDto: UpdateUserDto) {
    const updateInfo = {
      ...user,
      ...updateUserDto
    };
    const id = updateInfo.id;
    delete updateInfo.id;
    delete updateInfo.username;
    delete updateInfo.iat;
    delete updateInfo.exp;
    this.user.update(id, updateInfo);
    return null;
  }

  // 删除用户
  remove(id: number) {
    this.user.delete(id);
    return null;
  }
}
