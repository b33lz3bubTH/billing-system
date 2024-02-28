import { Model } from "mongoose";
import { SellerModel, ISeller, SellerEntity } from "../../models/sellers";

export class SellersService {
  constructor(private model: Model<ISeller> = SellerModel) {}

  async create(data: SellerEntity): Promise<ISeller> {
    return this.model.create(data);
  }

  async get(id: string): Promise<ISeller | null> {
    return this.model.findById(id).exec();
  }

  async update(
    id: string,
    data: Partial<SellerEntity>
  ): Promise<ISeller | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }

  async search(text: string): Promise<ISeller[]> {
    return this.model
      .find({ $text: { $search: text } })
      .sort({ score: { $meta: "textScore" }, createdAt: -1 })
      .exec();
  }

  async paginate(
    take: number,
    skip: number,
    filter: Partial<SellerEntity>
  ): Promise<ISeller[]> {
    const query = this.model
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(take);
    const results = await query.exec();
    return results;
  }

  async count(filter: Partial<SellerEntity>): Promise<number> {
    return await this.model
      .countDocuments(filter)
      .sort({ createdAt: -1 })
      .exec();
  }
}
