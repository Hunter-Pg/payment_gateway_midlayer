export class YCPGW_Customer_info
{
    private _name?: string;
    private _email?: string;
    private _customerId?: string | undefined;
    

    constructor (customerId: string);
    constructor (name: string, email: string);
    constructor (customerId: string, name: string, email: string);

    constructor (...ary: any[])
    {
        switch (ary.length)
        {
            case 1:
                this.customerId = ary[0];
                break;
            case 2:
                this.name = ary[0];
                this.email = ary[1];
                break;
            case 3:
                this.customerId = ary[0];
                this.name = ary[1];
                this.email = ary[2];
                break;
            default:
                break;
        }
    }

    public get email(): string | undefined{ return this._email;}
    public set email(value: string | undefined) { this._email = value;}
    public get name(): string | undefined{ return this._name;}
    public set name(value: string | undefined) { this._name = value;}
    public get customerId(): string | undefined {return this._customerId;}
    public set customerId(value: string | undefined) {this._customerId = value;}
}