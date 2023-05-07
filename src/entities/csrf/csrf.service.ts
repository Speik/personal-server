import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { createHash, randomBytes } from 'crypto';
import { Request } from 'express';

const TOKEN_SIZE = 32;

const CSRF_HASH_COOKIE_NAME = 'x-csrf-token-hash';
const CSRF_TOKEN_COOKIE_NAME = 'x-csrf-token';
const CSRF_HEADER_NAME = 'x-csrf-token';

@Injectable()
class CsrfService {
  public constructor(private configService: ConfigService) {}

  public generateToken(): string {
    return randomBytes(TOKEN_SIZE).toString('hex');
  }

  public generateTokenHash(token: string): string {
    const csrfSecret = this.getSecret();

    if (!token) {
      throw new Error(
        'Unable to generate csrf token hash. Token was not provided',
      );
    }

    return createHash('sha256').update(`${token}${csrfSecret}`).digest('hex');
  }

  public validateToken(req: Request): boolean {
    const token: string = <string>req.headers[CSRF_HEADER_NAME];
    const tokenHash: string = req.cookies[CSRF_HASH_COOKIE_NAME];

    if (!token || !tokenHash) {
      return false;
    }

    const expectedHash = this.generateTokenHash(token);
    return expectedHash === tokenHash;
  }

  private getSecret(): string {
    return this.configService.get<string>('CSRF_SECRET');
  }
}

export { CSRF_HASH_COOKIE_NAME, CSRF_TOKEN_COOKIE_NAME, CsrfService };
