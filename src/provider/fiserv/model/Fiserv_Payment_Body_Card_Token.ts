import { YCPGW_Card_Info, YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info } from "../../../model";
import { Fiserv_PaymentMethod_Card } from "./Fiserv_PaymentMethod_Card";

export class Fiserv_Payment_Body_Card_Token
{
    private paymentCard!: Fiserv_PaymentMethod_Card;
    private createToken!: any;
    private requestType!: string;

    constructor (txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info)
    {
        this.requestType = txInfo.senderType;
        let cardInfo = txInfo.senderInfo as YCPGW_Card_Info;
        this.paymentCard = (new Fiserv_PaymentMethod_Card(cardInfo)).paymentCard;

        this.createToken = new Object();
        this.createToken.reusable = reuseInfo?.reusable || true;
        this.createToken.declineDuplicates = false;
    }
}