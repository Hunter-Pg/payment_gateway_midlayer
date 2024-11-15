import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
import { createSHA512, createHashBase64 } from "../../../util_common/YCPGW_General_Method";
import TILL from "../model/Till_Config";

export class Till_Header_Generator extends YCPGW_Lib_Internal
{
    private apiSecret: string;
    private timestamp!: string;
    private apiUser!: string;
    private apiPsd!: string;
    private testMode!: boolean;

    constructor ()
    {
        super();
        this.apiSecret = TILL.TILL_API_SECRET;
        this.apiUser = TILL.TILL_API_USER;
        this.apiPsd = TILL.TILL_API_PSD;
        this.testMode = TILL.TILL_API_TEST_MODE;
    }

    fetchHeader (requestBody: any, endpoint: string)
    {
        const authApi = this.fetchAuth();
        const msgSign = this.fetchMessageSignature(requestBody, endpoint);
        //DEBUG
        if (this.DEBUG_MODE) this.deBugMode(requestBody, endpoint, authApi);

        let headerApi: any = {
                                headers: {
                                    "Authorization": authApi,
                                    "Content-Type": this.HEADER_CONTENT_TYPE_UTF8,
                                    "Date": this.timestamp,
                                    "X-Signature": msgSign
                                }        
                            }

        if (this.testMode) headerApi.headers["X-Environment"] = "Sandbox";
        
        return headerApi
    }
    
    private fetchMessageSignature (requestBody: any, endpoint: string)
    {
        const method = this.HEADER_TILL_METHOD_POST;
        const reqBodySHA512 = createSHA512(JSON.stringify(requestBody));
        const contentType = this.HEADER_CONTENT_TYPE_UTF8;
        this.timestamp = new Date().toUTCString();

        const rawSignature = (new Array(method, reqBodySHA512, contentType, this.timestamp, endpoint)).join("\n");
        const computedHmac = createHashBase64(rawSignature, this.apiSecret, this.GENERAL_SHA512);
    
        return computedHmac;
    }

    private fetchAuth ()
    {
        let authApiAry = new Array(this.HEADER_TILL_AUTH);
        let userAndPsdStr = (new Array(this.apiUser, this.apiPsd)).join(":");
        authApiAry.push(Buffer.from(userAndPsdStr).toString(this.GENERAL_BASE64));

        return authApiAry.join(" ")
    }
    
    private deBugMode (...ary: any[])
    {
        console.log("::> Till > endpoint: ", ary[1])
        console.log("::> Till > authApi: ", ary[2])
        console.log("::> Till > apiSecret: ", this.apiSecret)
        console.log("::> Till > timestamp: ", this.timestamp)
        console.log("::> Till > requestBody: ", JSON.stringify(ary[0]))
    }
}