import { YCPGW_Amount_Info, YCPGW_Transaction_Info } from "../../../model";
import { Till_Payment_BodyInfo, Till_Payment_Body_Card_Token } from "../model";

export class Till_Body_Generator
{
    fetchPaymentBody (amountInfo: YCPGW_Amount_Info, txInfo: YCPGW_Transaction_Info) 
    {
        return new Till_Payment_BodyInfo(amountInfo, txInfo);
    }

    fetchCardTokenBody (txInfo: YCPGW_Transaction_Info)
    {
        return new Till_Payment_Body_Card_Token(txInfo);
    }
}