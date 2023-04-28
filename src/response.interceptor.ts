/*
 * @Description: 响应拦截器
 * @Author: IFLS
 * @Date: 2023-04-17 18:11:32
 * @LastEditTime: 2023-04-28 16:07:55
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Request } from "express";

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { url, method, query, body } = request;

    return next.handle().pipe(
      map(data => {
        console.log("nestjs ok:", { url, query, body, method, data });
        return {
          status: 0,
          success: true,
          message: "请求成功",
          data: data
        };
      })
    );
  }
}
