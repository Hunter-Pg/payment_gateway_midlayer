import { YCPGW_Common_Info } from "./YCPGW_Common_Info";
export declare class YCPGW_Store_Info extends YCPGW_Common_Info {
    private _storeId;
    constructor(storeId: string, userId?: string);
    get storeId(): string;
    set storeId(value: string);
}
