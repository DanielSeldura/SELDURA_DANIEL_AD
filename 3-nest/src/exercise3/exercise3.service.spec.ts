import { Test, TestingModule } from '@nestjs/testing';
import { Exercise3Service } from './exercise3.service';

describe('Exercise3Service', () => {
  let service: Exercise3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Exercise3Service],
    }).compile();

    service = module.get<Exercise3Service>(Exercise3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
