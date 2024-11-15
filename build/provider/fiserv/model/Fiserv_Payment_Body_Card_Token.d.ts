import { YCPGW_Card_Token_Reuse_info, YCPGW_Transaction_Info } from "../../../model";
export declare class Fiserv_Payment_Body_Card_Token {
    private paymentCard;
    private createToken;
    private requestType;
    constructor(txInfo: YCPGW_Transaction_Info, reuseInfo?: YCPGW_Card_Token_Reuse_info);
}
