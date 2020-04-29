import { Test, TestingModule } from '@nestjs/testing';
import { ImpotService } from './impot.service';

describe('ImpotService', () => {
  let service: ImpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpotService],
    }).compile();

    service = module.get<ImpotService>(ImpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
