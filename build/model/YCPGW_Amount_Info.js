"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Amount_Info = void 0;
class YCPGW_Amount_Info {
    constructor(total, currency) {
        this.total = total;
        this.currency = currency;
    }
    get currency() { return this._currency; }
    set currency(value) { this._currency = value; }
    get total() { return this._total; }
    set total(value) { this._total = value; }
}
exports.YCPGW_Amount_Info = YCPGW_Amount_Info;
