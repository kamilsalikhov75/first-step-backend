import { createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((_, ctx): number | null => {
  const request = ctx.switchToHttp().getRequest();

  return request.user?.userId || null;
});
