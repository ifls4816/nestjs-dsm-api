import { NestFactory, NestApplication } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exception.filter";
import { ResponseInterceptor } from "./response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: true // 开启跨域
    // logger: ["error", "warn", "log", "verbose"]
  });
  // 全局异常拦截器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局相应过滤器
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
