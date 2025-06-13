/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Get,
  ForbiddenException,
  Patch,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('product_detail')
  @Get('detail/:slug')
  async productDetail(@Param('slug') slug: string) {
    const product = await this.productsService.productDetail(slug);

    if (!product) {
      throw new ForbiddenException('Product not found');
    }

    return product;
  }

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('update_product')
  @Patch('update/:slug')
  async updateProduct(
    @Param('slug') slug: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updated = await this.productsService.updateProduct(
      slug,
      updateProductDto,
    );

    if (!updated) {
      throw new ForbiddenException('Failed to update product');
    }

    return updated;
  }
}
