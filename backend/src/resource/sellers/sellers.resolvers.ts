import {
  SellerCreateInput,
  Sellers,
  SellerFilterInput,
} from "../../generated/graphql";
import { SellerEntity } from "../../models/sellers";
import { GqlPagination } from "../../common/types";
import { SellersService } from "./sellers.services";
const service = new SellersService();

const resolvers = {
  Query: {
    fetchSellers: async (
      _: unknown,
      { filter, take, skip }: GqlPagination<SellerFilterInput>
    ): Promise<{ data: Sellers[]; count: number }> => {
      const [data, count] = await Promise.all([
        service.paginate(take, skip, filter as SellerEntity),
        service.count(filter as SellerEntity),
      ]);
      return {
        data: data as unknown as Sellers[],
        count,
      };
    },
    fetchSeller: async (
      _: unknown,
      { _id }: { _id: string }
    ): Promise<Sellers | null> => {
      const data = await service.get(_id);
      return data as unknown as Sellers;
    },
  },
  Mutation: {
    createSellers: async (
      _: unknown,
      { data }: { data: SellerCreateInput }
    ): Promise<Sellers> => {
      const seller = await service.create(data as SellerEntity);
      return seller as unknown as Sellers;
    },
  },
};
export { resolvers };
