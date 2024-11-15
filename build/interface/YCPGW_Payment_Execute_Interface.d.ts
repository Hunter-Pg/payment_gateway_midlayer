import { YCPGW_Payment_Processor_Interface } from "./YCPGW_Payment_Processor_Interface";
export interface YCPGW_Payment_Execute_Interface extends YCPGW_Payment_Processor_Interface {
    TX_DataBuild(): void;
}
