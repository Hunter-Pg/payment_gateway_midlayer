"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Pay_Id_Info = void 0;
class YCPGW_Pay_Id_Info {
    constructor(email, phone) {
        this.email = email;
        this.phone = phone;
    }
    get email() { return this._email; }
    set email(value) { this._email = value; }
    get phone() { return this._phone; }
    set phone(value) { this._phone = value; }
}
exports.YCPGW_Pay_Id_Info = YCPGW_Pay_Id_Info;
