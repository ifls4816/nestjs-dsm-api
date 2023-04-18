/*
 * @Description: 异常过滤器
 * @Author: IFLS
 * @Date: 2023-04-17 18:03:27
 * @LastEditTime: 2023-04-17 18:52:42
 */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const httpStatus = exception.getStatus();
    const data: any = exception.getResponse();
    console.log("异常过滤器已触发...", request.url);
    response.status(httpStatus).json({
      status: httpStatus,
      success: false,
      message: "服务异常",
      timestamp: new Date().toISOString(),
      path: request.url,
      ...data
    });
  }
}
