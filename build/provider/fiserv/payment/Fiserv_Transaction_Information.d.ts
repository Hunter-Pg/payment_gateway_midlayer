import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
export declare class Fiserv_Transaction_Information extends YCPGW_Payment_Execute {
    TX_Fetch(transactionId: string): Promise<any>;
}
