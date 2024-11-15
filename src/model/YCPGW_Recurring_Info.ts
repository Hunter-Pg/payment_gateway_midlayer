import { YCPGW_Card_Info } from "./YCPGW_Card_Info";
import { YCPGW_Common_Info } from "./YCPGW_Common_Info";

export class YCPGW_Recurring_Info extends YCPGW_Common_Info
{
    private _paymentInfo!: YCPGW_Card_Info;
    private _frequency!: YCPGW_Recurring_Frequency_Info;
    
    constructor (paymentInfo: YCPGW_Card_Info, recurringInfo: YCPGW_Recurring_Frequency_Info)
    {
        super();
        this.paymentInfo = paymentInfo;
        this.frequency = recurringInfo;
    }

    public get paymentInfo(): YCPGW_Card_Info {return this._paymentInfo;}
    public set paymentInfo(value: YCPGW_Card_Info) {this._paymentInfo = value;}
    public get frequency(): YCPGW_Recurring_Frequency_Info {return this._frequency;}
    public set frequency(value: YCPGW_Recurring_Frequency_Info) {this._frequency = value;}
}

export class YCPGW_Recurring_Frequency_Info
{
    private _every!: number;
    private _unit!: string;

    constructor (every: number, unit: string)
    {
        this.every = every;
        this.unit = unit.toLowerCase();
    }

    public get every(): number {return this._every;}
    public set every(value: number) {this._every = value;}
    public get unit(): string {return this._unit;}
    public set unit(value: string) {this._unit = value;}

}