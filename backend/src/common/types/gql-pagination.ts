export interface GqlPagination<Y> {
  filter: Y | null;
  take: number;
  skip: number;
}
