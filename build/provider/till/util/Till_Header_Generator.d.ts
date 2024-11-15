import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
export declare class Till_Header_Generator extends YCPGW_Lib_Internal {
    private apiSecret;
    private timestamp;
    private apiUser;
    private apiPsd;
    private testMode;
    constructor();
    fetchHeader(requestBody: any, endpoint: string): any;
    private fetchMessageSignature;
    private fetchAuth;
    private deBugMode;
}
