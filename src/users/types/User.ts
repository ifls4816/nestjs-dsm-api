import { Request } from "express";
import { CreateUserDto } from "../dto/create-user.dto";

export interface UserRequest extends Request {
  user: CreateUserDto;
}

export interface UesrParams {
  username: string;
  password: string;
}
