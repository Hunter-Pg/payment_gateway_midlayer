import { YCPGW_Transaction_Result } from "../../../model/YCPGW_Transaction_Result";
import { YCPGW_Http_Helper } from "../../../util_common/YCPGW_Http_Helper";
import FISERV from "../model/Fiserv_Config"



export class Fiserv_Http_Helper extends YCPGW_Http_Helper
{
    private API_URL = FISERV.FISERV_API_URL;
    //override
    async executePost(action: string, body: string, header: any, fingerprint?: any): Promise<any>
    {        
        try {
            const endpoint = this.API_URL + action;
            const result = await super.executePost(endpoint, body, header);
            switch (action)
            {
                case this.ENDPOINT_FISERV_PAYMENTS:
                    return this.createPaymentResponseResult(result);
                case this.ENDPOINT_FISERV_PAYMENT_TOKENS:
                    return this.createCardTokenResponseResult(result, fingerprint!);
                default: // REFUND RESULT
                    return this.createPaymentResponseResult(result);
            }
            
        } catch (error) {
            console.log("::> Fiserv > error: ", error)
        }
    }
    
    //override
    async executeGet(transactionId: string, header: any): Promise<any>
    {
        try {
            const endpoint = `${this.API_URL}${this.ENDPOINT_FISERV_PAYMENTS}/${transactionId}`;
            return await super.executeGet(endpoint, header);
        } catch (error) {
            console.log("::>  Fiserv > error: ", error)
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
        if (result.status) 
            return this.createPaymentResponseResultSuccessful(result);
        else
            return this.createPaymentResponseResultFailed(result);
    }

    private createPaymentResponseResultSuccessful (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::>  Fiserv > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = true;
        let status: string;
        let description: string;

        transactionId = result.data.ipgTransactionId;
        status = result.data.transactionStatus;
        description = result.data.processor.responseMessage;

        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    }

    private createPaymentResponseResultFailed (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::>  Fiserv > response: ", result.response);
        if (!result.response.data) throw new Error(this.RESPONSE_ERROR_GENERAL);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = false;
        let status: string;
        let description: string;


        transactionId = result.response.data.ipgTransactionId;
        if (result.response.data.errorMessage)
        {
            status = result.response.data.ipgTransactionId;
            status = result.response.data.transactionStatus;
            description = result.response.data.errorMessage;    
        }
        else
        {
            status = result.response.data.responseType;

            if (result.response.data.error.details)
                description = result.response.data.error.details[0].message;   
            else
                description = result.response.data.error.message;   
        }
        status = this.RESPONSE_STATUS_ARRAY.includes(status) ? status : this.RESPONSE_STATUS_ARRAY[2];
        
        return new YCPGW_Transaction_Result().createPaymentResponse(userId, transactionId, successful, status, description, result);
    } 
    
    private createCardTokenResponseResult(result: any, fingerprint: string): YCPGW_Transaction_Result
    {       
        if (result.status === 200) 
            return this.createCardTokenResponseResultSuccessful(result, fingerprint);
        else
            return this.createCardTokenResponseResultFailed(result);
    }

    private createCardTokenResponseResultSuccessful (result: any, fingerprint: string): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::>  Fiserv > response: ", result);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = true;
        let cardToken: string;
        let description: string;

        transactionId = result.data.ipgTransactionId;
        cardToken = result.data.paymentToken.value;
        description = result.data.requestStatus;

        return new YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);
    }

    private createCardTokenResponseResultFailed (result: any): YCPGW_Transaction_Result
    {
        if (this.DEBUG_MODE) console.log("::>  Fiserv > response: ", result.response);
        if (!result.response.data) throw new Error(this.RESPONSE_ERROR_GENERAL);

        let userId: string | undefined = this.GENERAL_NONE;
        let transactionId: string;
        let successful: boolean = false;
        let cardToken: string | undefined = this.GENERAL_NONE;
        let fingerprint: string | undefined = this.GENERAL_NONE;
        let description: string;

        transactionId = result.response.data.ipgTransactionId;
        if (result.response.data.error.details)
                description = result.response.data.error.details[0].message;   
            else
                description = result.response.data.error.message;   

        return new YCPGW_Transaction_Result().createCardTokenResponse(userId, transactionId, successful, cardToken, fingerprint, description, result);

    }
}