import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {
  constructor(
    private readonly  productsService:ProductsService
  ){}

  async runSeed(){
    await this.insertNewProducts();
    return 'seed'
 }

 private async insertNewProducts(){
  await this.productsService.deleteAllProducts();
 const products=initialData.products;
 const insetPromiese=[];

 products.forEach(product=>{
  insetPromiese.push(this.productsService.create(product))
 })

 await Promise.all(insetPromiese)
  return true;
}
}
