"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModel = exports.PageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PageSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true
    },
    pageNr: {
        type: Number,
        required: true
    }
}).set('autoIndex', true)
    .set('minimize', false)
    .set('timestamps', true);
exports.PageModel = (0, mongoose_1.model)('Page', exports.PageSchema);
//# sourceMappingURL=page.js.map