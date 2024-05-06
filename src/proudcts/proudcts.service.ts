import { Injectable } from '@nestjs/common';
import { CreateProudctDto } from './dto/create-proudct.dto';
import { UpdateProudctDto } from './dto/update-proudct.dto';

@Injectable()
export class ProudctsService {
  create(createProudctDto: CreateProudctDto) {
    return 'This action adds a new proudct';
  }

  findAll() {
    return `This action returns all proudcts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} proudct`;
  }

  update(id: number, updateProudctDto: UpdateProudctDto) {
    return `This action updates a #${id} proudct`;
  }

  remove(id: number) {
    return `This action removes a #${id} proudct`;
  }
}
