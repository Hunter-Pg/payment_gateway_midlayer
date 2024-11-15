import { YCPGW_Amount_Info, YCPGW_Transaction_Info } from "../../../model";
import { Till_Payment_BodyInfo, Till_Payment_Body_Card_Token } from "../model";
export declare class Till_Body_Generator {
    fetchPaymentBody(amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info): Till_Payment_BodyInfo;
    fetchCardTokenBody(txInfo: YCPGW_Transaction_Info): Till_Payment_Body_Card_Token;
}
