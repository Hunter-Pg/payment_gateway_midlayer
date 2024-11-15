import { decimalPlace } from "../../../util_common";

export class Fiserv_Payment_Amount
{
    public total: number;
    public currency: string;

    constructor (total: number, currency: string)
    {
        this.total = Number(decimalPlace(total, 2));
        this.currency = currency;
    }
}