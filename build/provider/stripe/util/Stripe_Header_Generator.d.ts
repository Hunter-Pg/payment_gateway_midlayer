import { YCPGW_Lib_Internal } from "../../../model/YCPGW_Lib_Internal";
export declare class Stripe_Header_Generator extends YCPGW_Lib_Internal {
    private apiKey;
    constructor();
    fetchHeader(): {
        headers: {
            "Content-Type": string;
            Authorization: string;
        };
    };
}
