import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // 不需要权限的守卫
  @Post("auth/login")
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  // 需要jwt权限的守卫
  // @UseGuards(JWTAuthGuard)
  // @Get("profile")
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
