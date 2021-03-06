import { Request, Response } from 'express';
import HttpStatusCode from '../util/HttpStatusCode';
import { IPage, PageModel } from '../models/page';
import { DocumentModel, IDocument } from '../models/document';


export class PageController {

  private static async getNewPageNr(documentId): Promise<number> {
    const doc: IDocument = await DocumentModel.findOne({ _id: documentId }).populate('pages');
    const lastPageNr = Math.max(...doc.pages.map((page: IPage) => page.pageNr));
    if (!isFinite(lastPageNr)) {
      return 1;
    } else {
      return lastPageNr + 1;
    }
  }

  public async getPages(req: Request, res: Response): Promise<void> {
    try {
      const pages = await PageModel.find();
      res.status(HttpStatusCode.OK).json({ pages });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async getPage(req: Request, res: Response): Promise<void> {
    try {
      const page = await PageModel.findOne({ _id: req.params.id });
      if (page === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        res.status(HttpStatusCode.OK).json(page);
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async createPage(req: Request, res: Response): Promise<void> {
    try {
      const { documentId } = req.body;
      delete req.body.documentId;

      const newPageNr = await PageController.getNewPageNr(documentId);
      const newPage = new PageModel({
        text: req.body.text.text,
        pageNr: newPageNr
      });

      const page = await PageModel.findOne({ _id: req.body.id });
      if (page === null) {
        const result = await newPage.save();
        await DocumentModel.findOneAndUpdate(
          { _id: documentId },
          { $push: { pages: [result._id] } }
        );

        if (result === null) {
          res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
        } else {
          res.status(HttpStatusCode.CREATED).json({ data: result });
        }
      } else {
        res.sendStatus(HttpStatusCode.UNPROCESSABLE_ENTITY);
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async updatePage(req: Request, res: Response): Promise<void> {
    try {
      const page = await PageModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (page === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        const updatedPage = { pageId: req.params.id, ...req.body };
        res.json({ status: res.status, data: updatedPage });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async deletePage(req: Request, res: Response): Promise<void> {
    try {
      const page = await PageModel.findOneAndDelete({ _id: req.params.id });
      if (page === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ response: 'Page deleted Successfully' });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }
}
