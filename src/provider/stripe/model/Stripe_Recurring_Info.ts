import { YCPGW_Recurring_Info } from "../../../model";

export class Stripe_Recurring_Info
{
    public interval_count: number;
    public interval: string;

    constructor(recurringInfo: YCPGW_Recurring_Info)
    {
        this.interval = recurringInfo.frequency.unit;
        this.interval_count = recurringInfo.frequency.every;
    }
}