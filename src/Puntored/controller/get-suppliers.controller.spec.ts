import { Test, TestingModule } from '@nestjs/testing';
import { GetSuppliersController } from './get-suppliers.controller.js';

describe('GetSuppliersController', () => {
  let controller: GetSuppliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetSuppliersController],
    }).compile();

    controller = module.get<GetSuppliersController>(GetSuppliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
