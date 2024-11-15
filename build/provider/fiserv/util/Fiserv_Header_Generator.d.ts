import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
export declare class Fiserv_Header_Generator extends YCPGW_Lib_Internal {
    private apiKey;
    private apiSecret;
    private clientReqId;
    private timestampMs;
    constructor();
    fetchHeader(requestBody?: any): {
        headers: {
            "Content-Type": string;
            "Client-Request-Id": string;
            "Api-Key": string;
            Timestamp: number;
            "Message-Signature": string;
        };
    };
    private fetchMessageSignature;
    private deBugMode;
}
