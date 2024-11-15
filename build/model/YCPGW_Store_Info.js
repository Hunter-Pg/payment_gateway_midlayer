"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Store_Info = void 0;
const YCPGW_Common_Info_1 = require("./YCPGW_Common_Info");
class YCPGW_Store_Info extends YCPGW_Common_Info_1.YCPGW_Common_Info {
    constructor(storeId, userId) {
        super();
        this.storeId = storeId;
        this.userId = userId;
    }
    get storeId() { return this._storeId; }
    set storeId(value) { this._storeId = value; }
}
exports.YCPGW_Store_Info = YCPGW_Store_Info;
