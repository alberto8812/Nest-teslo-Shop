import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProudctsService } from './proudcts.service';
import { CreateProudctDto } from './dto/create-proudct.dto';
import { UpdateProudctDto } from './dto/update-proudct.dto';

@Controller('proudcts')
export class ProudctsController {
  constructor(private readonly proudctsService: ProudctsService) {}

  @Post()
  create(@Body() createProudctDto: CreateProudctDto) {
    return this.proudctsService.create(createProudctDto);
  }

  @Get()
  findAll() {
    return this.proudctsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proudctsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProudctDto: UpdateProudctDto) {
    return this.proudctsService.update(+id, updateProudctDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proudctsService.remove(+id);
  }
}
