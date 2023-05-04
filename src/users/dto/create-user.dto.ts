import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  id: number;
  @ApiProperty({
    example: "",
    required: true
  }) // 定义文档中的参数
  username: string;
  @ApiProperty()
  password: string;
  remark: string;
  json: string;
  code?: string;
  iat?: number;
  exp?: number;
}
