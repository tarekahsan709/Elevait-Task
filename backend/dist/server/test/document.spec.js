"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const mocha_1 = require("mocha");
const server = require("../server");
const secrets_1 = require("../config/secrets");
const document_1 = require("../models/document");
const chaiHttp = require("chai-http");
process.env.NODE_ENV = secrets_1.Environment.Test;
const expect = chai.expect;
chai.use(chaiHttp);
describe('GET /documents', () => {
    const documents = [{
            title: 'Rich Dad Poor Dad',
            author: 'Robert Kiyosaki and Sharon Lechter',
            pages: []
        },
        {
            title: 'Batman',
            author: 'DC Comics',
            pages: []
        }];
    (0, mocha_1.before)(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield document_1.DocumentModel.deleteMany({});
            yield document_1.DocumentModel.insertMany(documents);
        });
    });
    (0, mocha_1.after)(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield document_1.DocumentModel.deleteMany({});
        });
    });
    (0, mocha_1.it)('should get all documents', function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield chai
                .request(server)
                .get('/api/v1/documents');
            expect(res.status).to.equal(200);
            expect(res.body.docs).to.be.a('array');
        });
    });
    (0, mocha_1.it)('should create a new document', function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const mockDocument = {
                title: 'Rich Dad Poor Dad',
                author: 'Robert Kiyosaki and Sharon Lechter',
                pages: []
            };
            const res = yield chai
                .request(server)
                .post('/api/v1/documents')
                .send(mockDocument);
            expect(res.status).to.equal(201);
            expect(res.body).to.be.a('object');
        });
    });
});
//# sourceMappingURL=document.spec.js.map