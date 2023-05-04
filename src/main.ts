import { NestFactory, NestApplication } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./exception.filter";
import { ResponseInterceptor } from "./response.interceptor";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as session from "express-session";
import { jwtConstants } from "./auth/constants";

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: true // 开启跨域
    // logger: ["error", "warn", "log", "verbose"]
  });
  // 全局异常拦截器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局响应过滤器
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle("api文档")
    .setDescription("文档描述")
    .setVersion("1.0")
    .addBearerAuth()
    // .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs/", app, document);
  app.use(
    session({
      secret: jwtConstants.secret,
      name: "ifls.session",
      rolling: true // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
    })
  );
  console.log("port:", 4888);
  await app.listen(4888);
}
bootstrap();
