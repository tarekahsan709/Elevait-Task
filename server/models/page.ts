import { Document, model, Model, Schema, Types } from "mongoose";

export interface IPage extends Document {
  _id: Types.ObjectId;
  text: string;
  pageNr: number;
}

export const pageSchema: Schema = new Schema({
  text: {
    type: String,
    required: true
  },
  pageNr: {
    type: Number,
    required: true
  }
}).set("autoIndex", true)
  .set("minimize", false)
  .set("timestamps", true);

export const page: Model<IPage> = model<IPage>("Page", pageSchema);

