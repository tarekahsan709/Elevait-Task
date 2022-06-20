import { Document, model, Model, Schema, Types } from "mongoose";
import { IPage, pageSchema } from "./page";

export interface IDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  pages: IPage[];
  createdAt: string;
  updatedAt: string;
}

export const documentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Number,
    required: true
  },
  pages: [pageSchema]
}).set("autoIndex", true)
  .set("minimize", false)
  .set("timestamps", true);

export const document: Model<IDocument> = model<IDocument>("Document", documentSchema);
