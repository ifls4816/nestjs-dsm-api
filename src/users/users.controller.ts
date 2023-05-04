import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JWTAuthGuard } from "../auth/local-auth.guard";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { UserRequest } from "../users/types/User";

@ApiTags("用户增删改查")
@ApiBearerAuth()
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("captcha")
  createCaptcha(@Req() req: Request, @Res() res: Response) {
    return this.usersService.getCaptcha(req, res);
  }

  // @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "新增用户", description: "username password" })
  // 新增用户
  @Post()
  create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(req, createUserDto);
  }

  // 根据token获取用户信息
  @UseGuards(JWTAuthGuard)
  @Get()
  findAll(@Req() req: UserRequest) {
    return this.usersService.findUserInfo(req.user);
  }

  // 修改用户信息
  @UseGuards(JWTAuthGuard)
  @Patch()
  update(@Req() req: UserRequest, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }

  // 删除用户信息
  @UseGuards(JWTAuthGuard)
  @Delete()
  remove(@Req() req: UserRequest) {
    return this.usersService.remove(req.user.id);
  }
}
