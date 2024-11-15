import { YCPGW_Amount_Info, YCPGW_Transaction_Info } from "../../../model";
export declare class Till_Payment_BodyInfo {
    private merchantTransactionId;
    private cardData?;
    private referenceUuid?;
    private amount;
    private currency;
    constructor(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info);
}
