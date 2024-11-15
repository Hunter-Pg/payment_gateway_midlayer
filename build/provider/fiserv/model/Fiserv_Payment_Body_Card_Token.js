"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Payment_Body_Card_Token = void 0;
const Fiserv_PaymentMethod_Card_1 = require("./Fiserv_PaymentMethod_Card");
class Fiserv_Payment_Body_Card_Token {
    constructor(txInfo, reuseInfo) {
        this.requestType = txInfo.senderType;
        let cardInfo = txInfo.senderInfo;
        this.paymentCard = (new Fiserv_PaymentMethod_Card_1.Fiserv_PaymentMethod_Card(cardInfo)).paymentCard;
        this.createToken = new Object();
        this.createToken.reusable = (reuseInfo === null || reuseInfo === void 0 ? void 0 : reuseInfo.reusable) || true;
        this.createToken.declineDuplicates = false;
    }
}
exports.Fiserv_Payment_Body_Card_Token = Fiserv_Payment_Body_Card_Token;
