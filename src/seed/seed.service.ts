import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/entities/user.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

  async runSeed() {
    await this.deletetable();
    const admindUser = await this.insertUsers()
    await this.insertNewProducts(admindUser);
    return 'seed'
  }

  private async deletetable() {
    await this.productsService.deleteAllProducts();
    const queryBuilder = this.userModel.deleteMany()
  }
  private async insertUsers() {
    const seedusers = initialData.users;

    const users: User[] = []

    seedusers.forEach(async (user) => {
      users.push(await this.userModel.create(user))
    }
    )

    return users[0]
  }


  private async insertNewProducts(admindUser: User) {
    await this.productsService.deleteAllProducts();
    const products = initialData.products;
    const insetPromiese = [];

    products.forEach(product => {
      insetPromiese.push(this.productsService.create(product))
    })

    await Promise.all(insetPromiese)
    return true;
  }
}
