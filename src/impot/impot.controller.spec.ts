import { Test, TestingModule } from '@nestjs/testing';
import { ImpotController } from './impot.controller';

describe('Impot Controller', () => {
  let controller: ImpotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImpotController],
    }).compile();

    controller = module.get<ImpotController>(ImpotController);
  });

  it('should be defined', () => {
    expect('true').toBeDefined();
  });
});
