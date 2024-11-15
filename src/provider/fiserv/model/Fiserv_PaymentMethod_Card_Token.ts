import { YCPGW_Card_Info } from "../../../model/YCPGW_Card_Info";

export class Fiserv_PaymentMethod_Card_Token
{
    private paymentToken: any;

    constructor (cardinfo: YCPGW_Card_Info)
    {
        this.paymentToken = new Object();
        this.paymentToken.value = cardinfo.cardTokenId;
    }
}