import { YCPGW_Amount_Info, YCPGW_Transaction_Info } from "../../../model";
import { Fiserv_Payment_Amount } from "./Fiserv_Payment_Amount";
import { Fiserv_PaymentMethod_Card } from "./Fiserv_PaymentMethod_Card";
import { Fiserv_PaymentMethod_Card_Token } from "./Fiserv_PaymentMethod_Card_Token";
export declare class Fiserv_Payment_BodyInfo {
    transactionAmount: Fiserv_Payment_Amount;
    paymentMethod?: Fiserv_PaymentMethod_Card | Fiserv_PaymentMethod_Card_Token;
    requestType: string;
    storeId: string;
    constructor(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info);
}
