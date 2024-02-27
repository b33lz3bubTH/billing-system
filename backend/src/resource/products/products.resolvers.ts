import {
  ProductFilterInput,
  Products,
  ProductCreateInput,
} from "../../generated/graphql";
import { GqlPagination } from "../../common/types";

const resolvers = {
  Query: {
    fetchProducts: async (
      _: unknown,
      { filter, take, skip }: GqlPagination<ProductFilterInput>,
      context: any
    ): Promise<Products[]> => {
      const product: Products = {
        available: true,
        name: "Test Product",
      } as Products;
      const products: Products[] = [product];

      return products; // Return the fetched products
    },
  },
  Mutation: {
    createProducts: async (
      _: unknown,
      { data }: { data: ProductCreateInput }
    ): Promise<Products> => {
      console.log(`data: `, data, typeof data);
      console.log(`data.name: `, data.name, data.medias);
      console.log(data.medias?.length);

      const product: Products = data as Products;

      return product;
    },
  },
};
export { resolvers };
