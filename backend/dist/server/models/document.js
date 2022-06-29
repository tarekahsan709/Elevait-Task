"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModel = exports.DocumentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.DocumentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String
    },
    pages: [{
            type: mongoose_1.Types.ObjectId,
            ref: 'Page'
        }]
}).set('autoIndex', true)
    .set('minimize', false)
    .set('timestamps', true);
exports.DocumentModel = (0, mongoose_1.model)('Document', exports.DocumentSchema);
//# sourceMappingURL=document.js.map