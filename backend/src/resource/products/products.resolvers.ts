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
import { AppLogger, TransactionLogger } from "../../plugins/log/logger";
import { BaseResolver } from "../../contracts/resolvers";

const service = new ProductsService();
const productLogger = new AppLogger(`Products`);

class ProductResolver extends BaseResolver {
  @BaseResolver.QueryResolver()
  async fetchProducts(
    _: unknown,
    { filter, take, skip }: GqlPagination<ProductFilterInput>
  ): Promise<{ data: Products[]; count: number }> {
    const transactionLogger = new TransactionLogger();
    const [data, count] = await Promise.all([
      service.paginate(take, skip, filter as ProductEntity),
      service.count(filter as ProductEntity),
    ]);
    transactionLogger.flush(productLogger);
    return {
      data: data as unknown as Products[],
      count,
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

  @BaseResolver.MutationResolver()
  async createProducts(
    _: unknown,
    { data }: { data: ProductCreateInput }
  ): Promise<Products> {
    const product = await service.create(data as ProductEntity);
    return product as unknown as Products;
  }

  @BaseResolver.FieldResolver("SellerIDUnion", "__resolveType")
  async SellerIDUnion__resolveType(obj: any) {
    if (obj._id) {
      return ModelRefs.Sellers; // Return the type name for Sellers objects
    }
    return "OBJECT_ID";
  }

  @BaseResolver.FieldResolver("Products", "sellerId")
  async sellerId(_: IProduct) {
    if (isObjectIdOrHexString(_.sellerId)) {
      return { _solid_id: _.sellerId };
    }
    return _.sellerId;
  }
}

const resolversNew = ProductResolver.render();

export { resolversNew as resolvers };
