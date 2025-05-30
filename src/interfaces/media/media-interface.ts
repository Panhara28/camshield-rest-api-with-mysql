import { PaginationParmas } from '../pagination-interface';
import { MediaFilterInterface } from './media-filter-interface';

export interface QueryingMediaInterface {
  pagination: PaginationParmas;
  filter: MediaFilterInterface;
}
