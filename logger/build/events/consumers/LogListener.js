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
exports.LogListener = void 0;
const common_1 = require("@quasimodo147/common");
const pino_1 = __importDefault(require("pino"));
class LogListener extends common_1.Listener {
    constructor() {
        super(...arguments);
        this.queueName = common_1.LogQueues.LOG_INFO;
        this.logger = pino_1.default();
        this.onMessage = (payload) => __awaiter(this, void 0, void 0, function* () {
            if (!payload)
                return;
            try {
                const { message, level, data } = JSON.parse(payload.content.toString());
                this.logger[level](message, data);
            }
            catch (error) {
                console.log(payload.content.toString());
            }
            this.channel.ack(payload);
        });
    }
}
exports.LogListener = LogListener;
