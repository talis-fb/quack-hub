import { Test, TestingModule } from '@nestjs/testing';
import { MethodologiesController } from './methodologies.controller';

describe('MethodologiesController', () => {
  let controller: MethodologiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MethodologiesController],
    }).compile();

    controller = module.get<MethodologiesController>(MethodologiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
