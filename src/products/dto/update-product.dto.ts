import { PartialType } from '@nestjs/mapped-types';
import { CreateProudctDto } from './create-product.dto';

export class UpdateProudctDto extends PartialType(CreateProudctDto) {}
