import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { UserRequest } from "./users/types/User";
import { CreateUserDto } from "./users/dto/create-user.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // 不需要权限的守卫
  @Post("user/login")
  async login(@Request() req: UserRequest, @Body() createUserDto: CreateUserDto) {
    return this.authService.login(req, createUserDto);
  }

  // 需要jwt权限的守卫
  // @UseGuards(JWTAuthGuard)
  // @Get("profile")
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
