import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn() // 自增的id
  id: number;

  @Column()
  username: string;

  @Generated("uuid") // 生成uuid
  uuid: string;

  @Column({
    select: true, // 查询的时候 不返回此字段
    comment: "密码"
  })
  password: string;

  @CreateDateColumn() // 自动生成时间戳
  createTiem: Date;

  @Column({
    default: ""
  })
  remark: string;

  @Column("simple-json")
  json: string;
}
