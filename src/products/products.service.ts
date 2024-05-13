import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateProudctDto } from './dto/create-product.dto';
import { UpdateProudctDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';


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
  findAll(paginationDto:PaginationDto) {
    const {limit=20,page=1}=paginationDto;
    const products= this.ProductModel.find()
    .skip((page-1)*limit)
    .limit(limit)

    return products;
  }

  async findOne(id: string) {
    try {
      if(isValidObjectId(id)){
         return this.ProductModel.findById({_id:id});
      }else{

        return this.ProductModel.findById({_id:id});
      }
      
    } catch (error) {
      this.handleDBEceptions(error);
    }
  }

  async update(id: number, updateProudctDto: UpdateProudctDto) {
    return `This action updates a #${id} proudct`;
  }

  async remove(id: string) {
    const product=await this.findOne(id);

    console.log(product)
    if(!product){
      throw new NotFoundException(`product don' exist en db`)
    }
    await this.ProductModel.deleteOne({_id:product._id})
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
