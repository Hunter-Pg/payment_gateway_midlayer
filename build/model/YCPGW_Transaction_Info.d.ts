import { YCPGW_Bank_Info } from "./YCPGW_Bank_Info";
import { YCPGW_Card_Info } from "./YCPGW_Card_Info";
import { YCPGW_Pay_Id_Info } from "./YCPGW_Pay_Id_Info";
import { YCPGW_Recurring_Info } from "./YCPGW_Recurring_Info";
import { YCPGW_Store_Info } from "./YCPGW_Store_Info";
export declare class YCPGW_Transaction_Info {
    private _senderType;
    private _receiverType?;
    private _senderInfo;
    private _receiverInfo?;
    private _transactionId?;
    constructor(senderType: string, senderInfo: any, receiverType?: string, receiverInfo?: any);
    get transactionId(): string | undefined;
    set transactionId(value: string | undefined);
    get senderType(): string;
    set senderType(value: string);
    get receiverType(): string | undefined;
    set receiverType(value: string | undefined);
    get senderInfo(): YCPGW_Card_Info | YCPGW_Pay_Id_Info | YCPGW_Recurring_Info;
    set senderInfo(value: YCPGW_Card_Info | YCPGW_Pay_Id_Info | YCPGW_Recurring_Info);
    get receiverInfo(): YCPGW_Pay_Id_Info | YCPGW_Bank_Info | YCPGW_Store_Info;
    set receiverInfo(value: YCPGW_Pay_Id_Info | YCPGW_Bank_Info | YCPGW_Store_Info);
}
