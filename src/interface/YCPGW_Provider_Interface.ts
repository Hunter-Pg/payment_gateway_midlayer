import { YCPGW_Payment_Processor_Interface } from "./YCPGW_Payment_Processor_Interface";

export interface YCPGW_Provider_Interface extends YCPGW_Payment_Processor_Interface
{
    providerDataSetUP(providerData: YCPGW_Provider_Info): void;
    providerDataFetch(): any;
}