"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
const HttpStatusCode_1 = require("../util/HttpStatusCode");
const page_1 = require("../models/page");
const document_1 = require("../models/document");
class PageController {
    static getNewPageNr(documentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const doc = yield document_1.DocumentModel.findOne({ _id: documentId }).populate('pages');
            const lastPageNr = Math.max(...doc.pages.map((page) => page.pageNr));
            if (!isFinite(lastPageNr)) {
                return 1;
            }
            else {
                return lastPageNr + 1;
            }
        });
    }
    getPages(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const pages = yield page_1.PageModel.find();
                res.status(HttpStatusCode_1.default.OK).json({ pages });
            }
            catch (error) {
                res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    error: error.toString()
                });
            }
        });
    }
    getPage(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield page_1.PageModel.findOne({ _id: req.params.id });
                if (page === null) {
                    res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
                }
                else {
                    res.status(HttpStatusCode_1.default.OK).json(page);
                }
            }
            catch (error) {
                res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    error: error.toString()
                });
            }
        });
    }
    createPage(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { documentId } = req.body;
                delete req.body.documentId;
                const newPageNr = yield PageController.getNewPageNr(documentId);
                const newPage = new page_1.PageModel({
                    text: req.body.text.text,
                    pageNr: newPageNr
                });
                const page = yield page_1.PageModel.findOne({ _id: req.body.id });
                if (page === null) {
                    const result = yield newPage.save();
                    yield document_1.DocumentModel.findOneAndUpdate({ _id: documentId }, { $push: { pages: [result._id] } });
                    if (result === null) {
                        res.sendStatus(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR);
                    }
                    else {
                        res.status(HttpStatusCode_1.default.CREATED).json({ data: result });
                    }
                }
                else {
                    res.sendStatus(HttpStatusCode_1.default.UNPROCESSABLE_ENTITY);
                }
            }
            catch (error) {
                res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    error: error.toString()
                });
            }
        });
    }
    updatePage(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield page_1.PageModel.findOneAndUpdate({ _id: req.params.id }, req.body);
                if (page === null) {
                    res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
                }
                else {
                    const updatedPage = Object.assign({ pageId: req.params.id }, req.body);
                    res.json({ status: res.status, data: updatedPage });
                }
            }
            catch (error) {
                res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    error: error.toString()
                });
            }
        });
    }
    deletePage(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const page = yield page_1.PageModel.findOneAndDelete({ _id: req.params.id });
                if (page === null) {
                    res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
                }
                else {
                    res
                        .status(HttpStatusCode_1.default.OK)
                        .json({ response: 'Page deleted Successfully' });
                }
            }
            catch (error) {
                res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    error: error.toString()
                });
            }
        });
    }
}
exports.PageController = PageController;
//# sourceMappingURL=pageController.js.map