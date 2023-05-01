import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UAParser, IResult as IUserAgent } from 'ua-parser-js';

const UserAgent = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Nullable<IUserAgent> => {
    const request = ctx.switchToHttp().getRequest();
    const userAgentHeader: Optional<string> = request.headers['user-agent'];

    if (!userAgentHeader) return null;
    return new UAParser(userAgentHeader).getResult();
  },
);

export { UserAgent, IUserAgent };
