import { Request, Response } from "express";
import HttpStatusCode from "../util/HttpStatusCode";
import { IPage, PageModel } from "../models/page";


export class PageController {

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
      const page = await PageModel.findOne({ id: req.params.id });
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
      const newPage: IPage = new PageModel(req.body);
      const page = await PageModel.findOne({ id: req.body.id });
      if (page === null) {
        const result = await newPage.save();
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
        { id: req.params.id },
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
      const page = await PageModel.findOneAndDelete({ id: req.params.id });
      if (page === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ response: "Page deleted Successfully" });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }
}
