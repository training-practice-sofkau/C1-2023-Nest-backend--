import * as common from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

export const GetCustomer = common.createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const customer = request.user;
    return customer?.[data];
  },
);
