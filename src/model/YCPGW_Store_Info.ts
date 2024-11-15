import { YCPGW_Common_Info } from "./YCPGW_Common_Info";

export class YCPGW_Store_Info extends YCPGW_Common_Info
{
    private _storeId!: string;
    
    constructor (storeId: string, userId?: string)
    {
        super();
        this.storeId = storeId;
        this.userId = userId!;
    }

    public get storeId(): string { return this._storeId;}
    public set storeId(value: string) { this._storeId = value;}
}