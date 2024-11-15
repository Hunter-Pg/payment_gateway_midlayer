import { YCPGW_Card_Info } from "./YCPGW_Card_Info";
import { YCPGW_Common_Info } from "./YCPGW_Common_Info";
export declare class YCPGW_Recurring_Info extends YCPGW_Common_Info {
    private _paymentInfo;
    private _frequency;
    constructor(paymentInfo: YCPGW_Card_Info, recurringInfo: YCPGW_Recurring_Frequency_Info);
    get paymentInfo(): YCPGW_Card_Info;
    set paymentInfo(value: YCPGW_Card_Info);
    get frequency(): YCPGW_Recurring_Frequency_Info;
    set frequency(value: YCPGW_Recurring_Frequency_Info);
}
export declare class YCPGW_Recurring_Frequency_Info {
    private _every;
    private _unit;
    constructor(every: number, unit: string);
    get every(): number;
    set every(value: number);
    get unit(): string;
    set unit(value: string);
}
