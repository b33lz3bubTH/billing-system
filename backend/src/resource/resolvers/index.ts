import { merge } from "lodash";
import * as Product from "../products/products.resolvers";
import * as Seller from "../sellers/sellers.resolvers";

export const resolvers = merge({}, Product.resolvers, Seller.resolvers);
