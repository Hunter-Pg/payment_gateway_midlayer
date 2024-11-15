import { YCPGW_Provider_SDK_Interface } from "../interface/YCPGW_Provider_SDK_Interface";
import { YCPGW_Card_Info, YCPGW_Transaction_Result, YCPGW_Customer_info, YCPGW_Transaction_Info } from "../model";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";

export class YCPGW_Provider_SDK extends YCPGW_Lib_Internal implements YCPGW_Provider_SDK_Interface
{
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    async createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
    async Card_Token_Fetch(txInfo: YCPGW_Transaction_Info): Promise<YCPGW_Transaction_Result> { throw new Error(this.FUNCTION_NOT_IMOLEMENT);}
}