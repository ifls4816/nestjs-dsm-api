/*
 * @Description:
 * @Author: IFLS
 * @Date: 2023-05-04 15:48:10
 * @LastEditTime: 2023-05-04 15:48:10
 */
import * as svgCaptcha from "svg-captcha";

export const drawCaptcha = () => {
  const captcha = svgCaptcha.create({
    size: 4, //生成几个验证码
    fontSize: 28, //文字大小
    width: 100, //宽度
    height: 34, //高度
    background: "#cc9966" //背景颜色
  });
  return captcha;
};
