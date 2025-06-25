import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from 'src/shared/interfaces/token-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & Record<string, any>>();

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request) as string;

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: ITokenPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });

      if (!payload.userId) {
        throw new UnauthorizedException('Token is expired');
      }

      request.user = {
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
      };
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (
        request.headers as unknown as Record<string, string>
      ).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
