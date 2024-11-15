import { YCPGW_Card_Info, YCPGW_Transaction_Result } from "../model";
import { YCPGW_Customer_info } from "../model/YCPGW_Customer_info";
export interface YCPGW_Provider_SDK_Interface {
    createUserForProvider(userInfo: YCPGW_Customer_info): Promise<YCPGW_Transaction_Result>;
    fetchCardInformation(cardTokenInfo: YCPGW_Card_Info): Promise<YCPGW_Transaction_Result>;
}
