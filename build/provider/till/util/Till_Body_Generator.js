"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Till_Body_Generator = void 0;
const model_1 = require("../model");
class Till_Body_Generator {
    fetchPaymentBody(amountInfo, txInfo) {
        return new model_1.Till_Payment_BodyInfo(amountInfo, txInfo);
    }
    fetchCardTokenBody(txInfo) {
        return new model_1.Till_Payment_Body_Card_Token(txInfo);
    }
}
exports.Till_Body_Generator = Till_Body_Generator;
