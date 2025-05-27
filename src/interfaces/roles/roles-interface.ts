import { PaginationParmas } from '../pagination-interface';
import { RoleFilterInterface } from './roles-filter-interface';

export interface QueryingRoleInterface {
  filter: RoleFilterInterface;
  pagination: PaginationParmas;
}
