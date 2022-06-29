"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRoutes = void 0;
const express_1 = require("express");
const pageController_1 = require("../controllers/pageController");
class PageRoutes {
    constructor() {
        this.pageController = new pageController_1.PageController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', this.pageController.getPages);
        this.router.get('/:id', this.pageController.getPage);
        this.router.post('/', this.pageController.createPage);
        this.router.put('/:id', this.pageController.updatePage);
        this.router.delete('/:id', this.pageController.deletePage);
    }
}
exports.PageRoutes = PageRoutes;
//# sourceMappingURL=pageRoutes.js.map