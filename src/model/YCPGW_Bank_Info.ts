import { YCPGW_Common_Info } from "./YCPGW_Common_Info";

export class YCPGW_Bank_Info extends YCPGW_Common_Info
{
    private _account!: string;
    private _ownerName?: string;
    
    constructor (account: string, ownerName?: string, userId?:  string)
    {
        super();
        this.account = account;
        this.ownerName = ownerName;
        this.userId = userId!;
    }

    public get account(): string { return this._account;}
    public set account(value: string) { this._account = value;}
    public get ownerName(): string | undefined { return this._ownerName;}
    public set ownerName(value: string | undefined) { this._ownerName = value;}
}