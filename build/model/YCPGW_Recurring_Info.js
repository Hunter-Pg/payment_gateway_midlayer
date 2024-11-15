"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YCPGW_Recurring_Frequency_Info = exports.YCPGW_Recurring_Info = void 0;
const YCPGW_Common_Info_1 = require("./YCPGW_Common_Info");
class YCPGW_Recurring_Info extends YCPGW_Common_Info_1.YCPGW_Common_Info {
    constructor(paymentInfo, recurringInfo) {
        super();
        this.paymentInfo = paymentInfo;
        this.frequency = recurringInfo;
    }
    get paymentInfo() { return this._paymentInfo; }
    set paymentInfo(value) { this._paymentInfo = value; }
    get frequency() { return this._frequency; }
    set frequency(value) { this._frequency = value; }
}
exports.YCPGW_Recurring_Info = YCPGW_Recurring_Info;
class YCPGW_Recurring_Frequency_Info {
    constructor(every, unit) {
        this.every = every;
        this.unit = unit.toLowerCase();
    }
    get every() { return this._every; }
    set every(value) { this._every = value; }
    get unit() { return this._unit; }
    set unit(value) { this._unit = value; }
}
exports.YCPGW_Recurring_Frequency_Info = YCPGW_Recurring_Frequency_Info;
