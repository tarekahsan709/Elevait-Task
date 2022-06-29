"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRoutes = void 0;
const express_1 = require("express");
const documentController_1 = require("../controllers/documentController");
class DocumentRoutes {
    constructor() {
        this.documentController = new documentController_1.DocumentController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.get('/', this.documentController.getDocuments);
        this.router.get('/:id', this.documentController.getDocument);
        this.router.post('/', this.documentController.createDocument);
        this.router.put('/:id', this.documentController.updateDocument);
        this.router.delete('/:id', this.documentController.deleteDocument);
    }
}
exports.DocumentRoutes = DocumentRoutes;
//# sourceMappingURL=documentRoutes.js.map