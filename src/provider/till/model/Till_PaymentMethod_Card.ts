import { YCPGW_Card_Info } from '../../../model';
import { numberPad, padFullYear, removeSpace } from '../../../util_common';

export class Till_PaymentMethod_Card
{
    private cardHolder?: string;
    private pan!: string;
    private cvv!: string;
    private expirationMonth!: string;
    private expirationYear!: string;

    constructor (cardInfo: YCPGW_Card_Info)
    {
        this.cardHolder = cardInfo.cardHolder;
        this.pan = removeSpace(cardInfo.number);
        this.cvv = cardInfo.securityCode;
        this.expirationMonth = numberPad(cardInfo.expiryMonth, 2);
        this.expirationYear = padFullYear(cardInfo.expiryYear);
    }
}