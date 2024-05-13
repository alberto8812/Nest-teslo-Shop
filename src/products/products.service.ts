import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProudctDto } from './dto/create-product.dto';
import { UpdateProudctDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model, isValidObjectId } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService'); //es un sima de loger que ya nos ofrece nest
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<Product>,
  ) {}

  async create(createProudctDto: CreateProudctDto) {
    try {
      const product = await this.ProductModel.create(createProudctDto);
      return product;
    } catch (error) {
      this.handleDBEceptions(error);
    }
  }
  findAll(paginationDto: PaginationDto) {
    const { limit = 20, page = 1 } = paginationDto;
    const products = this.ProductModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return products;
  }

  async findOne(term: string) {
    let product: Product;
    try {
      if (isValidObjectId(term)) {
        product = await this.ProductModel.findById({ _id: term });
      } else {
        product = await this.ProductModel.findOne({ slug: term });
      }
      console.log(term)
      if (!product) {
        throw new BadRequestException(`product don' exist en db ${term}`);
      }

      return product;
    } catch (error) {
      console.log(error);
      this.handleDBEceptions(error);
    }
  }

  async update(id: string, updateProudctDto: UpdateProudctDto) {
     const product= await this.findOne(id);
     const transformProduc=await product.toJSON()
      await product.updateOne({...transformProduc,...updateProudctDto},{new:true});
      await product.save()
    return await this.findOne(id);
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await this.ProductModel.deleteOne({ _id: product._id });
    return `This action removes a #${id} proudct`;
  }

  private handleDBEceptions(error: any) {

    if (error.status <= 499 &&  error.status>=400)  {
      throw new BadRequestException(error.response.message);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server log',
    );
  }
}
