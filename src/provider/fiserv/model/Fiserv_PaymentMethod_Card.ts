import { YCPGW_Card_Info } from "../../../model/YCPGW_Card_Info";
import { numberPad, removeSpace } from "../../../util_common";

export class Fiserv_PaymentMethod_Card
{
    public paymentCard: any;

    constructor (cardInfo: YCPGW_Card_Info) {
        this.paymentCard = new Object();

        this.paymentCard.number = removeSpace(cardInfo.number);
        this.paymentCard.securityCode = cardInfo.securityCode;
        this.paymentCard.expiryDate = new cardExpiryDate(cardInfo.expiryMonth, cardInfo.expiryYear);
    }
}

class cardExpiryDate
{
    private month: string;
    private year: string;

    constructor (expiryMonth: string, expiryYear: string)
    {
        this.month = numberPad(expiryMonth, 2);
        this.year = expiryYear;
    }
}