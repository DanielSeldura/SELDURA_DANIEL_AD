import { Module } from '@nestjs/common';
import { Exercise3Controller } from './exercise3.controller';
import { Exercise3Service } from './exercise3.service';

@Module({
  controllers: [Exercise3Controller],
  providers: [Exercise3Service]
})
export class Exercise3Module {}
