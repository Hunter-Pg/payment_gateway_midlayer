import { YCPGW_Customer_info } from "./YCPGW_Customer_info";

export class YCPGW_Card_Token_Reuse_info
{
    public reusable: boolean;
    public customerInfo?: YCPGW_Customer_info;

    constructor (reusable: boolean, customerInfo?: YCPGW_Customer_info)
    {
        this.reusable = reusable;
        this.customerInfo = customerInfo;
    }
}