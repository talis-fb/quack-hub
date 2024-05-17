import { Test, TestingModule } from '@nestjs/testing';
import { MethodologiesService } from './methodologies.service';

describe('MethodologiesService', () => {
  let service: MethodologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MethodologiesService],
    }).compile();

    service = module.get<MethodologiesService>(MethodologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
