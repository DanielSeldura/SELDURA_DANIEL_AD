import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Exercise3Service } from './exercise3.service';

@Controller('exercise3')
export class Exercise3Controller {
  constructor(private readonly e3: Exercise3Service) {}

  @Get('/loopsTriangle/:height')
  loopsTriangle(@Param('height') height: string) {
    var parsedHeight: number = parseInt(height);
    return this.e3.loopsTriangle(parsedHeight);
  }

  @Get('/car/:id')
  getOne(@Param("id") id:string) {
    return this.e3.getCar(id);
  }
  @Post('/addCar')
  addCar(@Body() body: any) {
    return this.e3.addCar(body);
  }

  @Put('/replaceCar/:id')
  replaceCar(@Param("id") id:string, @Body() body: any) {
    return this.e3.replaceCar(id,body);
  }

  @Delete('/replaceCar/:id')
  removeCar(@Param("id") id:string) {
    return this.e3.deleteCar(id);
  }

  @Get('/addJoshCar2')
  test2() {
    return this.e3.addJoshCar2();
    // return;
  }

  @Get('/logCars')
  logCars() {
    return this.e3.logAllCars();
    // return;
  }
}