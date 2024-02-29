import {
  ProductFilterInput,
  Products,
  ProductCreateInput,
} from "../../generated/graphql";
import { IProduct, ProductEntity } from "../../models/products";
import { GqlPagination } from "../../common/types";
import { ProductsService } from "./products.services";
import { ModelRefs } from "../../models/models";
import { isObjectIdOrHexString } from "mongoose";
import { AppLogger } from "../../plugins/log/logger";
import { BaseResolver } from "../../contracts/resolvers";

const service = new ProductsService();
const productLogger = new AppLogger(`Products`);

class ProductResolver extends BaseResolver {
  @BaseResolver.QueryResolver()
  async fetchProducts(
    _: unknown,
    { filter, take, skip }: GqlPagination<ProductFilterInput>
  ): Promise<{ data: Products[]; count: number }> {
    console.log(`called: resolver`);
    // const transactionLogger = new TransactionLogger();

    // const [data, count] = await Promise.all([
    //   service.paginate(take, skip, filter as ProductEntity),
    //   service.count(filter as ProductEntity),
    // ]);
    // // transactionLogger.flush(productLogger);
    // return {
    //   data: data as unknown as Products[],
    //   count,
    // };
    return {
      data: [{ name: "abcd" }] as unknown as Products[],
      count: 500,
    };
  }

  @BaseResolver.QueryResolver()
  async fetchProduct(
    _: unknown,
    { _id }: { _id: string }
  ): Promise<Products | null> {
    console.log(`called: resolver`);

    const data = await service.get(_id);
    return data as unknown as Products;
  }
}

const resolvers = {
  Query: {
    fetchProducts: async (
      _: unknown,
      { filter, take, skip }: GqlPagination<ProductFilterInput>
    ): Promise<{ data: Products[]; count: number }> => {
      // const transactionLogger = new TransactionLogger();

      const [data, count] = await Promise.all([
        service.paginate(take, skip, filter as ProductEntity),
        service.count(filter as ProductEntity),
      ]);
      // transactionLogger.flush(productLogger);
      return {
        data: data as unknown as Products[],
        count,
      };
    },
    fetchProduct: async (
      _: unknown,
      { _id }: { _id: string }
    ): Promise<Products | null> => {
      const data = await service.get(_id);
      return data as unknown as Products;
    },
  },
  Mutation: {
    createProducts: async (
      _: unknown,
      { data }: { data: ProductCreateInput }
    ): Promise<Products> => {
      const product = await service.create(data as ProductEntity);
      return product as unknown as Products;
    },
  },
  SellerIDUnion: {
    __resolveType(obj: any) {
      if (obj._id) {
        return ModelRefs.Sellers; // Return the type name for Sellers objects
      }
      return "OBJECT_ID";
    },
  },
  Products: {
    sellerId: (_: IProduct) => {
      if (isObjectIdOrHexString(_.sellerId)) {
        return { _solid_id: _.sellerId };
      }
      return _.sellerId;
    },
  },
};
// export { resolvers };
const resolversNew = ProductResolver.render();
console.log(`resolversNew: `, resolversNew);
console.log(JSON.stringify(resolversNew));
// Convert resolver functions to string representations
const resolversStringified = JSON.stringify(
  resolversNew,
  (key, value) => {
    // Check if the value is a function
    if (typeof value === "function") {
      // Convert the function to a string
      return value.toString();
    }
    return value;
  },
  2
); // Optional: add indentation for better readability

console.log(`resolversNew func: `, resolversStringified);
console.log(
  `type of query`,
  // resolversNew.Query.fetchProducts(null, { take: 200, skip: 700 }, null, null),
  typeof resolversNew.Query.fetchProducts
);

export { resolversNew as resolvers };
