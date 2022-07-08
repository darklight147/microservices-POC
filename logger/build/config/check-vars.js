"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVars = void 0;
const vars = {
    RABBIT_URL: process.env.RABBIT_URL,
};
const checkVars = () => {
    for (const [key, value] of Object.entries(vars)) {
        if (!value) {
            throw new Error(`${key} is not set`);
        }
    }
};
exports.checkVars = checkVars;
