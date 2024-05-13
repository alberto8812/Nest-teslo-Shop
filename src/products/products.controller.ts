import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProudctDto } from './dto/create-product.dto';
import { UpdateProudctDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('products')
export class ProductsController {
  constructor(private readonly proudctsService: ProductsService) {}

  @Post()
  create(@Body() createProudctDto: CreateProudctDto) {
    return this.proudctsService.create(createProudctDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.proudctsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proudctsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProudctDto: UpdateProudctDto) {
    return this.proudctsService.update(+id, updateProudctDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proudctsService.remove(id);
  }
}
