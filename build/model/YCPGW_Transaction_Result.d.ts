import { YCPGW_Common_Info } from "./YCPGW_Common_Info";
export declare class YCPGW_Transaction_Result extends YCPGW_Common_Info {
    transactionId: string | undefined;
    successful: boolean;
    status: string;
    description: string;
    responseFromProvider: any;
    cardToken: string | undefined;
    fingerprint: string | undefined;
    createPaymentResponse(userId: string | undefined, transactionId: string | undefined, successful: boolean, status: string, message: string, responseFromProvider: any): YCPGW_Transaction_Result;
    createCardTokenResponse(userId: string | undefined, transactionId: string | undefined, successful: boolean, cardToken: string | undefined, fingerprint: string | undefined, message: string, responseFromProvider: any): YCPGW_Transaction_Result;
}
