export class YCPGW_Amount_Info
{
    private _total!: number;
    private _currency!: string;
    
    constructor (total: number, currency: string)
    {
        this.total = total;
        this.currency = currency;
    }

    public get currency(): string { return this._currency;}
    public set currency(value: string) { this._currency = value;}
    public get total(): number { return this._total;}
    public set total(value: number) { this._total = value;}
}