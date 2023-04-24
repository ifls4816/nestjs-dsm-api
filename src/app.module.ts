import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

const DBConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: "192.168.31.87",
  port: 3306,
  username: "root",
  password: "j;wztmrf0.0",
  database: "db",
  entities: [],
  // synchronize: true, // 自动同步 生产不要使用
  synchronize: false, // 自动同步 生产不要使用
  retryDelay: 500, // 重试连接数据库间隔
  retryAttempts: 10, // 重试连接次数
  autoLoadEntities: true // 自动加载实体 entities文件
};
@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(DBConfig)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
