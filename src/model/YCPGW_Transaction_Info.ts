import { YCPGW_Bank_Info } from "./YCPGW_Bank_Info";
import { YCPGW_Card_Info } from "./YCPGW_Card_Info";
import { YCPGW_Pay_Id_Info } from "./YCPGW_Pay_Id_Info";
import { YCPGW_Recurring_Info } from "./YCPGW_Recurring_Info";
import { YCPGW_Store_Info } from "./YCPGW_Store_Info";


export class YCPGW_Transaction_Info
{
    private _senderType!: string;
    private _receiverType?: string;
    private _senderInfo!: YCPGW_Card_Info | YCPGW_Pay_Id_Info | YCPGW_Recurring_Info;
    private _receiverInfo?: YCPGW_Pay_Id_Info | YCPGW_Bank_Info | YCPGW_Store_Info;
    private _transactionId?: string;
    
    constructor(senderType: string, senderInfo: any, receiverType?: string, receiverInfo?: any)
    {
        this.senderType = senderType;
        this.senderInfo = senderInfo;
        this.receiverType = receiverType!;
        this.receiverInfo = receiverInfo;
    }
    
    public get transactionId(): string | undefined { return this._transactionId;}
    public set transactionId(value: string | undefined) { this._transactionId = value;}
    public get senderType(): string { return this._senderType;}
    public set senderType(value: string) { this._senderType = value;}
    public get receiverType(): string | undefined { return this._receiverType;}
    public set receiverType(value: string | undefined) { this._receiverType = value;}
    public get senderInfo(): YCPGW_Card_Info | YCPGW_Pay_Id_Info  | YCPGW_Recurring_Info{ return this._senderInfo;}
    public set senderInfo(value: YCPGW_Card_Info | YCPGW_Pay_Id_Info  | YCPGW_Recurring_Info) { this._senderInfo = value;}
    public get receiverInfo(): YCPGW_Pay_Id_Info | YCPGW_Bank_Info | YCPGW_Store_Info { return this._receiverInfo!;}
    public set receiverInfo(value: YCPGW_Pay_Id_Info | YCPGW_Bank_Info | YCPGW_Store_Info) { this._receiverInfo = value;}
}