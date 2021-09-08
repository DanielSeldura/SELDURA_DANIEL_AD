import { Controller, Get, Param } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
  constructor(private readonly e3: Exercise3Service) {}

  @Get('/helloWorld/:name')
  getHello(@Param('name') name:string): string {
    return this.e3.helloWorld(name);
  }

  @Get('/loopsTriangle/:height')
  loopsTriangle(@Param('height') height: string) {
    var parsedHeight = parseInt(height);
    return this.e3.loopsTriangle(parsedHeight);
  }

  @Get('/loopsTriangle/:num')
  primeNumber(num:number){
    
  }
  //the anatomy of a typescript function
  //   functionName(someparameterhere:theType):thereturntype {
  //       thefunctioncode
  //       return (must match return type);
  //   }
}
