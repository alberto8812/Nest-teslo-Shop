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
import { ProductIamge } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  Delete() {
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger('ProductsService'); //es un sima de loger que ya nos ofrece nest
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<Product>,
    @InjectModel(ProductIamge.name)
    private readonly productIamge: Model<ProductIamge>,
  ) {}

  async create(createProudctDto: CreateProudctDto) {
    try {
      const { images = [], ...newcreateProudctDto } = createProudctDto;

      const product = await this.ProductModel.create({
        ...newcreateProudctDto,
      });
      const imagesPromises = images.map((url) =>
        this.productIamge.create({ url: url, product: product._id }),
      );
      const imagenesServer = await Promise.all(imagesPromises);

      const imagenes = [];
      imagenesServer.map((imgurl) => product.images.push(imgurl._id));
      product.save();

      return product;
    } catch (error) {
      console.log(error);
      this.handleDBEceptions(error);
    }
  }
  async findAll(paginationDto: PaginationDto) {
    const { limit = 20, page = 1 } = paginationDto;
    const products = await this.ProductModel.find()
      .populate({ path: 'images', select: ['url'] })
      .skip((page - 1) * limit)
      .limit(limit);

    return products.map((producto) => {
      const { images, ...newProducts } = producto.toObject();
      const newsImages = images.map((item: any) => item.url);
      return {
        ...newProducts, // Convertir el documento de Mongoose a un objeto JavaScript simple
        images: newsImages,
      };
    });
  }

  async findOne(term: string) {
    let product: Product;
    try {
      if (isValidObjectId(term)) {
        product = await this.ProductModel.findById({ _id: term }).populate({
          path: 'images',
          select: ['url'],
        });
      } else {
        product = await this.ProductModel.findOne({ slug: term }).populate({
          path: 'images',
          select: ['url'],
        });
      }
      if (!product) {
        throw new BadRequestException(`product don' exist en db ${term}`);
      }

      const { images, ...newProducts } = product.toObject();
      const newsImages = images.map((item: any) => item.url);
      return {
        ...newProducts, // Convertir el documento de Mongoose a un objeto JavaScript simple
        images: newsImages,
      };
    } catch (error) {
      console.log(error);
      this.handleDBEceptions(error);
    }
  }

  async update(id: string, updateProudctDto: UpdateProudctDto) {
    const { images, ...toUpdate } = updateProudctDto;
    const product = await this.findOne(id);
    if (!product)
      throw new NotFoundException(`Product with id:${id} not found`);

    // const session = await this.ProductModel.db.startSession();
    // session.startTransaction();
    try {
      let imagenesServer: Array<any> = [];
      if (images) {
        await this.productIamge.deleteMany({
          product: id,
        }) /*.session(session).exec()*/;
        const imagesPromises = images.map((url) =>
          this.productIamge.create({ url: url, product: product._id }),
        );
        imagenesServer = await Promise.all(imagesPromises);
        product.images = imagenesServer.map((img) => img._id);
        // product.images=images.map(
        //   async(image)=> await this.productIamge.create([{ url: image, product: product._id }]/*,{ session }*/))
      }
      //Object.assign(product, toUpdate);
      await this.ProductModel.updateOne(
        { _id: id },
        { ...product, ...toUpdate },
      );
      return await this.ProductModel.findById(id);
    } catch (error) {
      //  console.log(error)
      //   await session.abortTransaction();
      // session.endSession()
      console.log(error);
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    await this.productIamge.deleteMany({ product: product._id });

    await this.ProductModel.deleteOne({ _id: product._id });
    return `This action removes a #${id} proudct`;
  }

  async deleteAllProducts() {
    await this.ProductModel.deleteMany();
    await this.productIamge.deleteMany();
    return;
  }

  private handleDBEceptions(error: any) {
    if (error.status <= 499 && error.status >= 400) {
      throw new BadRequestException(error.response.message);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server log',
    );
  }
}
