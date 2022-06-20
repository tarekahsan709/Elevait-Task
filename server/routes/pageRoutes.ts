import { Router } from "express";

import { PageController } from "../controllers/pageController";

export class PageRoutes {
  public router: Router;
  public pageController: PageController = new PageController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.pageController.getPages);
    this.router.get("/:id", this.pageController.getPage);
    this.router.post("/", this.pageController.createPage);
    this.router.put("/:id", this.pageController.updatePage);
    this.router.delete("/:id", this.pageController.deletePage);
  }
}
