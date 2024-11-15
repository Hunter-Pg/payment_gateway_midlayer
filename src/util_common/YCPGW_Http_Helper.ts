import axios from "axios";
import { YCPGW_Lib_Internal } from "../model/YCPGW_Lib_Internal";

export class YCPGW_Http_Helper extends YCPGW_Lib_Internal implements YCPGW_Http_Helper_Interface
{
    async executeGet (endpoint: string, header: any): Promise<any> 
    {    
        //DEBUG
        if (this.DEBUG_MODE) this.deBugMode(endpoint, undefined, header);

        return await axios.get(endpoint, header)
        .then(res => res)
        .catch(error => error);
    }

    async executePost (endpoint: string, body: any, header: any, fingerprint?: string): Promise<any> 
    {
        //DEBUG
        if (this.DEBUG_MODE) this.deBugMode(endpoint, body, header);

        return await axios.post(endpoint, body, header)
        .then(res => res)
        .catch(error => error);
    }

    executePatch (): void 
    {
        throw new Error("Method not implemented.");
    }
    
    private deBugMode (endpoint?: string, body?: any, header?: any)
    {
        console.log("::> YCPGW > endpoint: ",endpoint);
        console.log("::> YCPGW > header: ",JSON.stringify(header));
        console.log("::> YCPGW > body: ",JSON.stringify(body));
    }

}

