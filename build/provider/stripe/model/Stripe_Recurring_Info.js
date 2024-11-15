"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe_Recurring_Info = void 0;
class Stripe_Recurring_Info {
    constructor(recurringInfo) {
        this.interval = recurringInfo.frequency.unit;
        this.interval_count = recurringInfo.frequency.every;
    }
}
exports.Stripe_Recurring_Info = Stripe_Recurring_Info;
