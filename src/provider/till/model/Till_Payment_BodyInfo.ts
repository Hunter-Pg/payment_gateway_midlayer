import { YCPGW_Amount_Info, YCPGW_Card_Info, YCPGW_Lib, YCPGW_Transaction_Info } from "../../../model";
import { v4 as uuidv4 } from 'uuid';
import { Till_PaymentMethod_Card } from "./Till_PaymentMethod_Card";
import { decimalPlace } from "../../../util_common";

export class Till_Payment_BodyInfo
{
    private merchantTransactionId!: string;
    private cardData?: Till_PaymentMethod_Card;
    private referenceUuid?: string;
    private amount!: string;
    private currency!: string;

    constructor (amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info)
    {
        const senderType = txInfo.senderType;
        this.merchantTransactionId = uuidv4();
        this.amount = decimalPlace(amountInfo.total, 2);
        this.currency = amountInfo.currency;
        
        const cardInfo = txInfo.senderInfo as YCPGW_Card_Info;

        // payment
        if (cardInfo)
        {
            if (YCPGW_Lib.PAYMENT_CARD_TOKEN == senderType)
                this.referenceUuid = cardInfo.cardTokenId;
            else if (YCPGW_Lib.PAYMENT_CARD == senderType)
                this.cardData = new Till_PaymentMethod_Card(cardInfo);
        }
        
        // refund
        if (txInfo.transactionId) this.referenceUuid = txInfo.transactionId;
    }
}