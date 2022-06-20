import { Document, model, Model, Schema, Types } from "mongoose";
import { IPage, PageSchema } from "./page";

export interface IDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  pages: IPage[];
  createdAt: string;
  updatedAt: string;
}

export const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Number,
    required: true
  },
  pages: [PageSchema]
}).set("autoIndex", true)
  .set("minimize", false)
  .set("timestamps", true);

export const DocumentModel: Model<IDocument> = model<IDocument>("Document", DocumentSchema);
