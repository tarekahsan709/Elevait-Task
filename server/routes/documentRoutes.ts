import { Router } from "express";

import { DocumentController } from "../controllers/documentController";

export class DocumentRoutes {
  public router: Router;
  public documentController: DocumentController = new DocumentController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.documentController.getDocuments);
    this.router.get("/:id", this.documentController.getDocument);
    this.router.post("/", this.documentController.createDocument);
    this.router.put("/:id", this.documentController.updateDocument);
    this.router.delete("/:id", this.documentController.deleteDocument);
  }
}
