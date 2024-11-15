import { YCPGW_Card_Info } from '../../../model';
export declare class Till_PaymentMethod_Card {
    private cardHolder?;
    private pan;
    private cvv;
    private expirationMonth;
    private expirationYear;
    constructor(cardInfo: YCPGW_Card_Info);
}
