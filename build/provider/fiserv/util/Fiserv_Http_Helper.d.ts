import { YCPGW_Http_Helper } from "../../../util_common/YCPGW_Http_Helper";
export declare class Fiserv_Http_Helper extends YCPGW_Http_Helper {
    private API_URL;
    executePost(action: string, body: string, header: any, fingerprint?: any): Promise<any>;
    executeGet(transactionId: string, header: any): Promise<any>;
    executePatch(): void;
    /**
     * structure of response ::
     * ::> success : result.status
     * ::> error   : result.response.status
     */
    private createPaymentResponseResult;
    private createPaymentResponseResultSuccessful;
    private createPaymentResponseResultFailed;
    private createCardTokenResponseResult;
    private createCardTokenResponseResultSuccessful;
    private createCardTokenResponseResultFailed;
}
