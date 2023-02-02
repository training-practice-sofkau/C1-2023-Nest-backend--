import { Controller, Get, Param } from '@nestjs/common';
import { Context } from './context';
import { Dog } from './dog';
import { Rabbit } from './rabbit';

@Controller('strategy')
export class Strategy {
  @Get('dog:action')
  actionDog(@Param('action') action: string): JSON {
    const context = new Context(new Dog());
    if (action == 'move') return JSON.parse(JSON.stringify(context.move()));
    else return JSON.parse(JSON.stringify(context.say()));
  }

  @Get('rabbit:action')
  actionRabbit(@Param('action') action: string): string {
    const context = new Context(new Rabbit());
    if (action == 'move') return context.move();
    else return context.say();
  }
}
