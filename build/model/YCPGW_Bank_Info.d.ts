import { YCPGW_Common_Info } from "./YCPGW_Common_Info";
export declare class YCPGW_Bank_Info extends YCPGW_Common_Info {
    private _account;
    private _ownerName?;
    constructor(account: string, ownerName?: string, userId?: string);
    get account(): string;
    set account(value: string);
    get ownerName(): string | undefined;
    set ownerName(value: string | undefined);
}
