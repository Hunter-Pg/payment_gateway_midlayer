import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";
export declare class YCPGW_Http_Helper extends YCPGW_Lib_Internal implements YCPGW_Http_Helper_Interface {
    executeGet(endpoint: string, header: any): Promise<any>;
    executePost(endpoint: string, body: any, header: any, fingerprint?: string): Promise<any>;
    executePatch(): void;
    private deBugMode;
}
