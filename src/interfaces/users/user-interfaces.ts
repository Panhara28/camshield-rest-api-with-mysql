import { PaginationParmas } from '../pagination-interface';
import { UserFilterInterface } from './user-filter-interface';

export interface UserInterface {
  pagination: PaginationParmas;
  filter: UserFilterInterface;
}
