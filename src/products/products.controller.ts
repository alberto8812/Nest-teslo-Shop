import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProudctDto } from './dto/create-product.dto';
import { UpdateProudctDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { MongoIdPipe } from 'src/common/pipe/mongoId.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interface';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';


@Controller('products')
export class ProductsController {
  constructor(private readonly proudctsService: ProductsService) {}

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createProudctDto: CreateProudctDto,@GetUser() user:User) {
    return this.proudctsService.create(createProudctDto,user);
  }

  @Get()
  @Auth(ValidRoles.user)
  findAll(@Query() paginationDto:PaginationDto) {
    return this.proudctsService.findAll(paginationDto);
  }

  @Get(':term')
  @Auth(ValidRoles.user)
  findOne(@Param('term') term: string) {
    return this.proudctsService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id',MongoIdPipe)  id: string, @Body() updateProudctDto: UpdateProudctDto,@GetUser() user:User) {
    return this.proudctsService.update(id, updateProudctDto,user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.proudctsService.remove(id);
  }
}
