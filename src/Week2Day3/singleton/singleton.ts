import { Controller, Get, Param, Post } from '@nestjs/common';
import { CopaMundo } from './copaMundo';

@Controller('singleton')
export class Singleton {
  private copaMundo = CopaMundo.getInstance();

  @Post(':country')
  setGanador(@Param() pais: string): JSON {
    this.copaMundo.setGanador(pais);
    return JSON.parse(JSON.stringify(pais));
  }

  @Get('instance')
  createInstance(): JSON {
    const a = CopaMundo.getInstance();
    return JSON.parse(JSON.stringify(a.getGanador()));
  }

  @Get()
  getGanador(): JSON {
    return JSON.parse(JSON.stringify(this.copaMundo.getGanador()));
  }
}
