"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Customer_info = void 0;
class YCPGW_Customer_info {
    constructor(...ary) {
        switch (ary.length) {
            case 1:
                this.customerId = ary[0];
                break;
            case 2:
                this.name = ary[0];
                this.email = ary[1];
                break;
            case 3:
                this.customerId = ary[0];
                this.name = ary[1];
                this.email = ary[2];
                break;
            default:
                break;
        }
    }
    get email() { return this._email; }
    set email(value) { this._email = value; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get customerId() { return this._customerId; }
    set customerId(value) { this._customerId = value; }
}
exports.YCPGW_Customer_info = YCPGW_Customer_info;
