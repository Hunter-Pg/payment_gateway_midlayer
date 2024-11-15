"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Till_Payment_Body_Card_Token = void 0;
const Till_PaymentMethod_Card_1 = require("./Till_PaymentMethod_Card");
const uuid_1 = require("uuid");
class Till_Payment_Body_Card_Token {
    constructor(txInfo) {
        this.merchantTransactionId = (0, uuid_1.v4)();
        const cardInfo = txInfo.senderInfo;
        this.cardData = new Till_PaymentMethod_Card_1.Till_PaymentMethod_Card(cardInfo);
    }
}
exports.Till_Payment_Body_Card_Token = Till_Payment_Body_Card_Token;
