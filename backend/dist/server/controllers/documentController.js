"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const tslib_1 = require("tslib");
const HttpStatusCode_1 = require("../util/HttpStatusCode");
const document_1 = require("../models/document");
class DocumentController {
    getDocuments(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield document_1.DocumentModel.find().populate('pages');
                res.status(HttpStatusCode_1.default.OK).json({ docs });
            }
            catch (error) {
                res.status(HttpStatusCode_1.default.INTERNAL_SERVER_ERROR).json({
                    timestamp: Date.now(),
                    error: error.toString()
                });
            }
        });
    }
    getDocument(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield document_1.DocumentModel.findOne({ _id: req.params.id }).populate('pages');
                if (doc === null) {
                    res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
                }
                else {
                    res.status(HttpStatusCode_1.default.OK).json(doc);
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
    createDocument(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const newDoc = new document_1.DocumentModel(req.body);
                const doc = yield document_1.DocumentModel.findOne({ _id: req.body.id });
                if (doc === null) {
                    const result = yield newDoc.save();
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
    updateDocument(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield document_1.DocumentModel.findOneAndUpdate({ _id: req.params.id }, req.body);
                if (doc === null) {
                    res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
                }
                else {
                    const updatedDoc = Object.assign({ docId: req.params.id }, req.body);
                    res.json({ status: res.status, data: updatedDoc });
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
    deleteDocument(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield document_1.DocumentModel.findOneAndDelete({ _id: req.params.id });
                if (doc === null) {
                    res.sendStatus(HttpStatusCode_1.default.NOT_FOUND);
                }
                else {
                    res
                        .status(HttpStatusCode_1.default.OK)
                        .json({ response: 'Document deleted Successfully' });
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
exports.DocumentController = DocumentController;
//# sourceMappingURL=documentController.js.map