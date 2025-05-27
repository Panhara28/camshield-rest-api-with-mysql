import { PaginationParmas } from '../pagination-interface';
import { UserFilterInterface } from './user-filter-interface';

export interface QueryingUserInterface {
  pagination: PaginationParmas;
  filter: UserFilterInterface;
}
