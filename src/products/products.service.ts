import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProudctDto } from './dto/create-product.dto';
import { UpdateProudctDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  private readonly logger =new Logger('ProductsService'); //es un sima de loger que ya nos ofrece nest
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel:Model<Product>
  ){}


 async create(createProudctDto: CreateProudctDto) {
   try {
     const product=await this.ProductModel.create(createProudctDto);
     return product;
   } catch (error) {
     this.handleDBEceptions(error);
  }
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

  private handleDBEceptions(error:any){
    console.log(error)
    if(error.code===11000){
      throw new BadRequestException(error.errmsg)
    }
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server log');
  }
}
