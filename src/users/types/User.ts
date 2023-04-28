import { Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";

export interface UsersResponse extends Response {
  user: CreateUserDto;
}

export interface UesrParams {
  username: string;
  password: string;
}
