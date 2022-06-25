export interface IPageResults {
  pages: IPage[];
}

export interface IPage {
  _id: string;
  text: string;
  pageNr: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageCreate {
  documentId: string;
  text: string;
  pageNr: number;
}
