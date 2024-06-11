import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileName } from './helpers/fileName.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configServeice:ConfigService,
  
  ) {}
  

  @Get('product/:imagesName')
  findProductImage(
    @Res() res: Response,// envio manual de respuesta salta interceptores
    @Param('imagesName') imagesName:string
  ){
    const path= this.filesService.getStaticProductImage(imagesName)
    res.sendFile(path)
  }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',{fileFilter:fileFilter,storage:diskStorage({
    destination:'./static/products',
    filename:fileName,
  })}))
  uploadProductImage(@UploadedFile() file:Express.Multer.File) {


    if(!file ){
      throw new BadRequestException('Make sure that the file is image')
    }
        const secureUrl=`${this.configServeice.get('HOST_API')}files/product/${file.filename}`;

    return {secureUrl};
  }
}
