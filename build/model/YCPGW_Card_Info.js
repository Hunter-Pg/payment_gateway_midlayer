"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Card_Info = void 0;
const YCPGW_Common_Info_1 = require("./YCPGW_Common_Info");
class YCPGW_Card_Info extends YCPGW_Common_Info_1.YCPGW_Common_Info {
    setCardInfoWithToken(cardTokenId, customerId, description, userId) {
        this.customerId = customerId;
        this.cardTokenId = cardTokenId;
        this.description = description || "";
        this.userId = userId;
        return this;
    }
    ;
    setCardInfoWithNumber(number, expiryMonth, expiryYear, securityCode, userId, cardHolder) {
        this.number = number;
        this.expiryMonth = expiryMonth;
        this.expiryYear = expiryYear;
        this.securityCode = securityCode;
        this.userId = userId;
        this.cardHolder = cardHolder;
        return this;
    }
    get customerId() { return this._customerId; }
    set customerId(value) { this._customerId = value; }
    get cardTokenId() { return this._cardTokenId; }
    set cardTokenId(value) { this._cardTokenId = value; }
    get description() { return this._description; }
    set description(value) { this._description = value; }
    get number() { return this._number; }
    set number(value) { this._number = value; }
    get expiryMonth() { return this._expiryMonth; }
    set expiryMonth(value) { this._expiryMonth = value; }
    get expiryYear() { return this._expiryYear; }
    set expiryYear(value) { this._expiryYear = value; }
    get securityCode() { return this._securityCode; }
    set securityCode(value) { this._securityCode = value; }
    get cardHolder() { return this._cardHolder; }
    set cardHolder(value) { this._cardHolder = value; }
}
exports.YCPGW_Card_Info = YCPGW_Card_Info;
