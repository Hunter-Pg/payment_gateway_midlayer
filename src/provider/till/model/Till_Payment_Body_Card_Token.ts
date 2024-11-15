import { YCPGW_Card_Info, YCPGW_Transaction_Info } from "../../../model";
import { Till_PaymentMethod_Card } from "./Till_PaymentMethod_Card";
import { v4 as uuidv4 } from 'uuid';

export class Till_Payment_Body_Card_Token
{
    private merchantTransactionId!: string;
    private cardData!: Till_PaymentMethod_Card;

    constructor (txInfo: YCPGW_Transaction_Info)
    {
        this.merchantTransactionId = uuidv4();
        
        const cardInfo = txInfo.senderInfo as YCPGW_Card_Info;
        this.cardData = new Till_PaymentMethod_Card(cardInfo);
    }
}