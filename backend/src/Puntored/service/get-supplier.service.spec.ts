import { Test, TestingModule } from '@nestjs/testing';
import { GetSupplierService } from './get-supplier.service.js';

describe('GetSupplierService', () => {
  let service: GetSupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetSupplierService],
    }).compile();

    service = module.get<GetSupplierService>(GetSupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
