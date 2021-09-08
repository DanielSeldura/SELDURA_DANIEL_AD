import { Controller, Get, Param } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
  constructor(private readonly e3: Exercise3Service) {}

  @Get('/loopsTriangle/:height')
  loopsTriangle(@Param('height') height: string) {
    var parsedHeight:number = parseInt(height);
    return this.e3.loopsTriangle(parsedHeight);
  }
}
