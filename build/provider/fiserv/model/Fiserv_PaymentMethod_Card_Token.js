"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_PaymentMethod_Card_Token = void 0;
class Fiserv_PaymentMethod_Card_Token {
    constructor(cardinfo) {
        this.paymentToken = new Object();
        this.paymentToken.value = cardinfo.cardTokenId;
    }
}
exports.Fiserv_PaymentMethod_Card_Token = Fiserv_PaymentMethod_Card_Token;
