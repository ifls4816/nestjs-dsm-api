/*
 * @Description: 响应拦截器
 * @Author: IFLS
 * @Date: 2023-04-17 18:11:32
 * @LastEditTime: 2023-04-17 18:47:40
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    console.log("响应拦截器已触发...");
    return next.handle().pipe(
      map(data => {
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
