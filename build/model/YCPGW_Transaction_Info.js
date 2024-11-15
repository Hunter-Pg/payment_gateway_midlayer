"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Transaction_Info = void 0;
class YCPGW_Transaction_Info {
    constructor(senderType, senderInfo, receiverType, receiverInfo) {
        this.senderType = senderType;
        this.senderInfo = senderInfo;
        this.receiverType = receiverType;
        this.receiverInfo = receiverInfo;
    }
    get transactionId() { return this._transactionId; }
    set transactionId(value) { this._transactionId = value; }
    get senderType() { return this._senderType; }
    set senderType(value) { this._senderType = value; }
    get receiverType() { return this._receiverType; }
    set receiverType(value) { this._receiverType = value; }
    get senderInfo() { return this._senderInfo; }
    set senderInfo(value) { this._senderInfo = value; }
    get receiverInfo() { return this._receiverInfo; }
    set receiverInfo(value) { this._receiverInfo = value; }
}
exports.YCPGW_Transaction_Info = YCPGW_Transaction_Info;
