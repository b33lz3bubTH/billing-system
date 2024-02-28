import { Schema, model } from "mongoose";
import { IBaseDocument, baseSchemaFields } from "./base";
import { SchemaFields } from "./type";
import { ModelRefs } from "./models";

interface SellerEntity {
  name: string;
  phone: string;
  address: string;
  active: boolean;
  medias: any[];
}
interface ISeller extends IBaseDocument, SellerEntity {}

const sellerSchemaFields: SchemaFields<SellerEntity> = {
  name: { type: String },
  phone: { type: String, unique: true },
  address: { type: String },
  medias: [{ type: Schema.Types.Mixed }],
  active: { type: Boolean },
};

const sellerSchema = new Schema<ISeller>({
  ...baseSchemaFields,
  ...sellerSchemaFields,
});

export const SellerModel = model<ISeller>(ModelRefs.Sellers, sellerSchema);

export { ISeller, SellerEntity };
