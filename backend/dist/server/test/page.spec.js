"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai = require("chai");
const mocha_1 = require("mocha");
const server = require("../server");
const secrets_1 = require("../config/secrets");
const page_1 = require("../models/page");
const chaiHttp = require("chai-http");
process.env.NODE_ENV = secrets_1.Environment.Test;
const expect = chai.expect;
chai.use(chaiHttp);
describe('GET /pages', () => {
    const pages = [{
            text: 'Robert Kiyosaki',
            pageNr: 1
        },
        {
            text: 'Sharon Lechter',
            pageNr: 2
        }];
    (0, mocha_1.before)(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield page_1.PageModel.deleteMany({});
            yield page_1.PageModel.insertMany(pages);
        });
    });
    (0, mocha_1.after)(function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield page_1.PageModel.deleteMany({});
        });
    });
    (0, mocha_1.it)('should get all pages', function () {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield chai
                .request(server)
                .get('/api/v1/pages');
            expect(res.status).to.equal(200);
            expect(res.body.pages).to.be.a('array');
        });
    });
});
//# sourceMappingURL=page.spec.js.map