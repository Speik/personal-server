import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const ConfigServiceInjector = Inject(ConfigService);
const sleep = (delay: number) =>
  new Promise((resolve) => setTimeout(resolve, delay));

/**
 * Use delay on routes responses
 * @param delay - Response delay in milliseconds
 */
export const Throttle = (delay: number): MethodDecorator => {
  return (target: Record<string, any>, __, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    ConfigServiceInjector(target, 'configService');

    descriptor.value = async function (...args: any[]) {
      const isThrottleEnabled = (<ConfigService>(
        this.configService
      )).get<boolean>('USE_RESPONSE_THROTTLE');

      const response = originalMethod.apply(this, args);

      if (!isThrottleEnabled) {
        return response;
      }

      await sleep(delay);
      return response;
    };

    return descriptor;
  };
};
