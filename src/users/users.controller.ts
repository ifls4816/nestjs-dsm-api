import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JWTAuthGuard } from "../auth/local-auth.guard";
import { Response } from "express";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
@ApiTags("用户增删改查")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "新增用户", description: "username password" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 根据token获取用户信息
  @UseGuards(JWTAuthGuard)
  @Get()
  findAll(@Request() req: Response | any) {
    return this.usersService.findUserInfo(req.user);
  }

  // 修改用户信息
  @UseGuards(JWTAuthGuard)
  @Patch()
  update(@Request() req: Response | any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // 删除用户信息
  @UseGuards(JWTAuthGuard)
  @Delete()
  remove(@Request() req: Response | any) {
    return this.usersService.remove(req.user.id);
  }
}
