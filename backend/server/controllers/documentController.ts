import { Request, Response } from 'express';

import HttpStatusCode from '../util/HttpStatusCode';
import { DocumentModel } from '../models/document';

export class DocumentController {

  public async getDocuments(req: Request, res: Response): Promise<void> {
    try {
      const docs = await DocumentModel.find().populate('pages');
      res.status(HttpStatusCode.OK).json({ docs });
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async getDocument(req: Request, res: Response): Promise<void> {
    try {
      const doc = await DocumentModel.findOne({ _id: req.params.id }).populate('pages');
      if (doc === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        res.status(HttpStatusCode.OK).json(doc);
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const newDoc = new DocumentModel(req.body);
      const doc = await DocumentModel.findOne({ _id: req.body.id });
      if (doc === null) {
        const result = await newDoc.save();
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

  public async updateDocument(req: Request, res: Response): Promise<void> {
    try {
      const doc = await DocumentModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      if (doc === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        const updatedDoc = { docId: req.params.id, ...req.body };
        res.json({ status: res.status, data: updatedDoc });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }

  public async deleteDocument(req: Request, res: Response): Promise<void> {
    try {
      const doc = await DocumentModel.findOneAndDelete({ _id: req.params.id });
      if (doc === null) {
        res.sendStatus(HttpStatusCode.NOT_FOUND);
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ response: 'Document deleted Successfully' });
      }
    } catch (error) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        timestamp: Date.now(),
        error: error.toString()
      });
    }
  }
}
