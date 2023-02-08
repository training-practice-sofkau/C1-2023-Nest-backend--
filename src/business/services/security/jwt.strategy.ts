import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constans';
import { CustomerEntity } from '../../../data/persistence/entities/customer.entity';
import { CustomerRepository } from 'src/data/persistence/repositories';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly customerRepository: CustomerRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.JTW_SECRET,
    });
  }

  async validate(payload: { id: string }): Promise<CustomerEntity> {
    const { id } = payload;
    try {
      const customer = this.customerRepository.findOneById(id);
      return customer;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
