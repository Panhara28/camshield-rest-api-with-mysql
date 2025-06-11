import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtGuard } from 'src/guard';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('category_list')
  @Get('list')
  getCategories() {
    return this.categoriesService.getCategoryTree();
  }
}
