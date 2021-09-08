import { Test, TestingModule } from '@nestjs/testing';
import { Exercise3Controller } from './exercise3.controller';

describe('Exercise3Controller', () => {
  let controller: Exercise3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Exercise3Controller],
    }).compile();

    controller = module.get<Exercise3Controller>(Exercise3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
