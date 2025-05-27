import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { HasPermission } from 'src/decorators/has-permission/has-permission.decorator';
import { OnlyAuthorizedRoleGuard } from 'src/guard/only-authorized-role/only-authorized-role.guard';
import { JwtGuard } from 'src/guard';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(JwtGuard, OnlyAuthorizedRoleGuard)
  @HasPermission('list_role')
  @Get('lists')
  roleList(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('name') name?: string,
  ) {
    return this.rolesService.roleList({
      filter: { name },
      pagination: {
        limit,
        page,
      },
    });
  }
}
