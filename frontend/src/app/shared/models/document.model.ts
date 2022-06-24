import { IPage } from './page.model';

export interface IDocumentResults {
  documents: IDocument[];
}

export interface IDocument {
  _id: string;
  title: string;
  author: string;
  pages: IPage[];
  createdAt: Date;
  updatedAt: Date;
}
