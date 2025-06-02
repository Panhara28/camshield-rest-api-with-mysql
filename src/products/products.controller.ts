/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';
import { JwtGuard } from 'src/guard';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('create_product')
  @Post('create')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
}
