import { Document, model, Model, Schema, Types } from 'mongoose';

export interface IDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  author: string;
  pages: [];
  dateCreated: string;
  createdAt: string;
  updatedAt: string;
}

export const DocumentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  dateCreated: {
    type: String
  },
  pages: [{
    type: Types.ObjectId,
    ref: 'Page'
  }]
}).set('autoIndex', true)
  .set('minimize', false)
  .set('timestamps', true);

export const DocumentModel: Model<IDocument> = model<IDocument>('Document', DocumentSchema);
