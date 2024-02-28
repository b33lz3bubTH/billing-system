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
import { TransactionLogger, AppLogger } from "../../plugins/log/logger";

const service = new ProductsService();
const productLogger = new AppLogger(`Products`);

const resolvers = {
  Query: {
    fetchProducts: async (
      _: unknown,
      { filter, take, skip }: GqlPagination<ProductFilterInput>
    ): Promise<{ data: Products[]; count: number }> => {
      const transactionLogger = new TransactionLogger();

      transactionLogger.log(`Started, lifecycle`);
      const [data, count] = await Promise.all([
        service.paginate(take, skip, filter as ProductEntity),
        service.count(filter as ProductEntity),
      ]);
      transactionLogger.log(`lifecycle data = ${data} - ${count}`);
      transactionLogger.log(`Ended, lifecycle`);

      transactionLogger.flush(productLogger);
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
export { resolvers };
