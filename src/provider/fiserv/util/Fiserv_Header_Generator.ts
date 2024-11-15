import FISERV from "../model/Fiserv_Config";
import { v4 as uuidv4 } from 'uuid';
import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
import { createHashBase64 } from "../../../util_common/YCPGW_General_Method";

export class Fiserv_Header_Generator extends YCPGW_Lib_Internal
{
    private apiKey: string;
    private apiSecret: string;
    private clientReqId!: string;
    private timestampMs!: number;

    constructor ()
    {
        super();
        this.apiKey= FISERV.FISERV_API_KEY;
        this.apiSecret = FISERV.FISERV_API_SECRET;
    }
    
    fetchHeader (requestBody?: any)
    {
        const msgSign = this.fetchMessageSignature(requestBody);
        return {
            headers: {
                "Content-Type": "application/json",
                "Client-Request-Id": this.clientReqId,
                "Api-Key": this.apiKey,
                "Timestamp": this.timestampMs,
                "Message-Signature": msgSign
            }        
        }
    }
    
    private fetchMessageSignature (requestBody: any)
    {
        this.clientReqId = uuidv4();
        this.timestampMs = new Date().getTime();
        let rawSignature: string;
    
        if (requestBody)
            rawSignature = this.apiKey + this.clientReqId + this.timestampMs + JSON.stringify(requestBody);
        else
            rawSignature = this.apiKey + this.clientReqId + this.timestampMs;
        
        //DEBUG
        if (this.DEBUG_MODE) this.deBugMode(requestBody);
    
        var computedHmac = createHashBase64(rawSignature, this.apiSecret, this.GENERAL_SHA256);
    
        return computedHmac;
    }
    
    private deBugMode (requestBody: any)
    {
        console.log("::> Fiserv > apiKey: ", this.apiKey)
        console.log("::> Fiserv > apiSecret: ", this.apiSecret)
        console.log("::> Fiserv > clientReqId: ", this.clientReqId)
        console.log("::> Fiserv > timestampMs: ", this.timestampMs)
        console.log("::> Fiserv > requestBody: ", JSON.stringify(requestBody))
    }
}    

