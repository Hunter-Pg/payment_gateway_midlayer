import { YCPGW_Amount_Info, YCPGW_Card_Info, YCPGW_Store_Info, YCPGW_Transaction_Info } from "../../../model";
import { Fiserv_Payment_Amount } from "./Fiserv_Payment_Amount";
import { Fiserv_PaymentMethod_Card } from "./Fiserv_PaymentMethod_Card";
import { Fiserv_PaymentMethod_Card_Token } from "./Fiserv_PaymentMethod_Card_Token";

export class Fiserv_Payment_BodyInfo  
{
    public transactionAmount: Fiserv_Payment_Amount;
    public paymentMethod?: Fiserv_PaymentMethod_Card | Fiserv_PaymentMethod_Card_Token;
    public requestType: string;
    public storeId: string;

    constructor (amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info)
    {
        let cardInfo = txInfo.senderInfo as YCPGW_Card_Info;
        
        this.transactionAmount = new Fiserv_Payment_Amount(amountInfo.total, amountInfo.currency);
        if (cardInfo)
        {
            if (cardInfo.cardTokenId)
                this.paymentMethod = new Fiserv_PaymentMethod_Card_Token(cardInfo);
            else if (cardInfo.number)
                this.paymentMethod = new Fiserv_PaymentMethod_Card(cardInfo);
        } 
        this.requestType = txInfo.senderType;
        this.storeId = (txInfo.receiverInfo as YCPGW_Store_Info)?.storeId;
    }
}