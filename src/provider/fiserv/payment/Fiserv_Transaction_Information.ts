
import { YCPGW_Payment_Execute } from "../../../core/YCPGW_Payment_Execute";
import { Fiserv_Header_Generator, Fiserv_Http_Helper } from "../util";

export class Fiserv_Transaction_Information extends YCPGW_Payment_Execute
{
    // override
    async TX_Fetch(transactionId: string) 
    {
        if (!this.fiservHttpHelper) this.fiservHttpHelper = new Fiserv_Http_Helper();

        const header = new Fiserv_Header_Generator().fetchHeader();
        return await this.fiservHttpHelper.executeGet(transactionId, header);
    }
}