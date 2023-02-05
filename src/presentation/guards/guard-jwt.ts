import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/configs/constants.config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const validate = this.jwtService.verify(request.body.token, {
      secret: jwtConstants.secret
    });
    if (validate) return true
    else throw new BadRequestException("Token no valido.")
  }
}
