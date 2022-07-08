"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_vars_1 = require("./config/check-vars");
const rabbitWrapper_1 = __importDefault(require("./config/rabbitWrapper"));
const LogListener_1 = require("./events/consumers/LogListener");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        check_vars_1.checkVars();
        new LogListener_1.LogListener(rabbitWrapper_1.default.connection).listen();
    });
}
start();
