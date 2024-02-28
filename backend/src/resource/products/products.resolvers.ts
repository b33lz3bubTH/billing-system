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

const service = new ProductsService();

const resolvers = {
  Query: {
    fetchProducts: async (
      _: unknown,
      { filter, take, skip }: GqlPagination<ProductFilterInput>
    ): Promise<{ data: Products[]; count: number }> => {
      const [data, count] = await Promise.all([
        service.paginate(take, skip, filter as ProductEntity),
        service.count(filter as ProductEntity),
      ]);
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
      console.log(`data: `, data);
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
      console.log(`_.sellerId?._id: `, _);
      if (isObjectIdOrHexString(_.sellerId)) {
        return { _solid_id: _.sellerId };
      }
      return _.sellerId;
    },
  },
};
export { resolvers };
