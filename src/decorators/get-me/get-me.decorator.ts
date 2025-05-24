import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetMe = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
