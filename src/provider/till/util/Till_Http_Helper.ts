import { YCPGW_Transaction_Result } from "../../../model/YCPGW_Transaction_Result";
import { YCPGW_Http_Helper, fetchMainDomain } from "../../../util_common";
import TILL from "../model/Till_Config";

export class Till_Http_Helper extends YCPGW_Http_Helper
{
    private API_URL = fetchMainDomain(TILL.TILL_API_URL);
    //override
    async executePost(action: string, body: string, header: any): Promise<any>
    {        
        try {
            const endpoint = this.API_URL + action;
            const result = await super.executePost(endpoint, body, header);

            if (action.includes(this.ENDPOINT_TILL_TRANSACTION_DEBIT))
                return this.createPaymentResponseResult(result);
            else if (action.includes(this.ENDPOINT_TILL_TRANSACTION_REGISTER))
                return this.createCardTokenResponseResult(result);
            else if (action.includes(this.ENDPOINT_TILL_TRANSACTION_REFUND))
                return this.createRefundResponseResult(result);

        } catch (error) {
            console.log("::> Till > error: ", error)
        }
    }
    
    //override
    async executeGet(transactionId: string, header: any): Promise<any>
    {
        try {
            
        } catch (error) {
            console.log("::> Till > error: ", error)
        }
    }
    
    //override
    executePatch()
    {
    
    } 
    
    /**
     * structure of response ::
     * ::> success : result.status
     * ::> error   : result.response.status
     */
    private createPaymentResponseResult(result: any): YCPGW_Transaction_Result
    {       
        if (result.data) 
            return this.createPaymentResponseResultSuccessful(result);
        else
            return this.createPaymentResponseResultFailed(result);
    }

    private createPaymentResponseResultSuccessful (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Till > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = true;
        let status: string;
        let description: string;

        const resData = result.data;
        transactionId = resData.uuid;
        status = resData.returnType;
        description = this.RESPONSE_TRASACTION_SUCCESSFUL;

        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }

    private createPaymentResponseResultFailed (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Till > response: ", result.response);
        
        if (!result.response.data) throw new Error(this.RESPONSE_ERROR_GENERAL);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string | undefined = this.GENERAL_NONE;
        let successful: boolean = false;
        let status: string;
        let description: string;

        const resData = result.response;
        status = resData.statusText;
        if (resData.data.errorMessage)
            description = resData.data.errorMessage;
        else
            description = resData.data.error.message;        
        
        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    } 
    
    private createCardTokenResponseResult(result: any): YCPGW_Transaction_Result
    {       
        if (result.data) 
            return this.createCardTokenResponseResultSuccessful(result);
        else
            return this.createCardTokenResponseResultFailed(result);
    }

    private createCardTokenResponseResultSuccessful (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Till > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = true;
        let cardToken: string;
        let fingerprint: string;
        let description: string;

        const resData = result.data
        transactionId = resData.purchaseId;
        cardToken = resData.uuid;
        description = this.RESPONSE_TRASACTION_SUCCESSFUL;
        fingerprint = resData.returnData.merchantFingerprint;

        return new YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }

    private createCardTokenResponseResultFailed (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Till > response: ", result.response);
        if (!result.response.data) throw new Error(this.RESPONSE_ERROR_GENERAL);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string | undefined = this.GENERAL_NONE;
        let successful: boolean = false;
        let cardToken: string | undefined = this.GENERAL_NONE;
        let fingerprint: string | undefined = this.GENERAL_NONE;
        let description: string;

        const resData = result.response;
        if (resData.data.errorMessage)
            description = resData.data.errorMessage;
        else
            description = resData.data.error.message;  

        return new YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }

    private createRefundResponseResult(result: any): YCPGW_Transaction_Result
    {       
        if (result.data) 
            return this.createRefundponseResultSuccessful(result);
        else
            return this.createRefundResponseResultFailed(result);
    }

    private createRefundponseResultSuccessful (result: any): YCPGW_Transaction_Result
    {
        return this.createPaymentResponseResultSuccessful(result); 
    }
    
    private createRefundResponseResultFailed (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::> Till > response: ", result.response);
        
        if (!result.data) throw new Error(this.RESPONSE_ERROR_GENERAL);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string | undefined = this.GENERAL_NONE;
        let successful: boolean = false;
        let status: string;
        let description: string;

        const resData = result.data;
        transactionId = resData.uuid;
        status = resData.returnType;
        description = resData.errors[0].errorMessage;
        
        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }
}