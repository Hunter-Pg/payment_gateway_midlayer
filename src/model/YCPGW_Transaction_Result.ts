import { YCPGW_Common_Info } from "./YCPGW_Common_Info";

export class YCPGW_Transaction_Result extends YCPGW_Common_Info
{
    public transactionId: string | undefined;
    public successful!: boolean;
    public status!: string;
    public description!: string;
    public responseFromProvider: any;
    public cardToken: string | undefined;
    public fingerprint: string | undefined;
    
    createPaymentResponse (userId: string | undefined, transactionId: string | undefined, successful: boolean, status: string, message: string, responseFromProvider: any): YCPGW_Transaction_Result
    {
        this.userId = userId;
        this.transactionId = transactionId;
        this.successful = successful;
        this.status = status;
        this.description = message;
        this.responseFromProvider = responseFromProvider;
        return this;
    }
    
    createCardTokenResponse (userId: string | undefined, transactionId: string | undefined, successful: boolean, cardToken: string | undefined, fingerprint: string | undefined, message: string, responseFromProvider: any): YCPGW_Transaction_Result
    {
        this.userId = userId;
        this.transactionId = transactionId;
        this.successful = successful;
        this.cardToken = cardToken;
        this.fingerprint = fingerprint;
        this.description = message;
        this.responseFromProvider = responseFromProvider;
        return this;
    }
}