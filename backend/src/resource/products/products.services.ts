import { Model } from "mongoose";
import { ProductModel, IProduct, ProductEntity } from "../../models/products";

export class ProductsService {
  constructor(private model: Model<IProduct> = ProductModel) {}

  async create(data: ProductEntity): Promise<IProduct> {
    return this.model.create(data);
  }

  async get(id: string): Promise<IProduct | null> {
    return this.model.findById(id).populate(["sellerId"]).exec();
  }

  async update(
    id: string,
    data: Partial<ProductEntity>
  ): Promise<IProduct | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async search(text: string): Promise<IProduct[]> {
    return this.model
      .find({ $text: { $search: text } })
      .sort({ score: { $meta: "textScore" }, createdAt: -1 })
      .exec();
  }

  async paginate(
    take: number,
    skip: number,
    filter: Partial<ProductEntity>
  ): Promise<IProduct[]> {
    const query = ProductModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(take);
    const products = await query.exec();
    return products;
  }

  async count(filter: Partial<ProductEntity>): Promise<number> {
    return await ProductModel.countDocuments(filter)
      .sort({ createdAt: -1 })
      .exec();
  }
}
