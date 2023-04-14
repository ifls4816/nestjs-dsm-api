import { NestFactory, NestApplication } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule, {
    cors: true // 开启跨域
    // logger: ["error", "warn", "log", "verbose"]
  });
  await app.listen(3000);
}
bootstrap();
