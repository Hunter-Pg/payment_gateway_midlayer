"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Bank_Info = void 0;
const YCPGW_Common_Info_1 = require("./YCPGW_Common_Info");
class YCPGW_Bank_Info extends YCPGW_Common_Info_1.YCPGW_Common_Info {
    constructor(account, ownerName, userId) {
        super();
        this.account = account;
        this.ownerName = ownerName;
        this.userId = userId;
    }
    get account() { return this._account; }
    set account(value) { this._account = value; }
    get ownerName() { return this._ownerName; }
    set ownerName(value) { this._ownerName = value; }
}
exports.YCPGW_Bank_Info = YCPGW_Bank_Info;
