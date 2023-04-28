import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
@Entity()
export class User {
  @PrimaryGeneratedColumn() // 自增的id
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @Generated("uuid") // 生成uuid
  uuid: string;

  @ApiProperty()
  @Column({
    select: true, // 查询的时候 不返回此字段
    comment: "密码"
  })
  password?: string;

  @CreateDateColumn() // 自动生成时间戳
  createTime: Date;

  @Column({
    default: ""
  })
  remark: string;

  @Column()
  json: string;
}
