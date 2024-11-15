export class YCPGW_Pay_Id_Info
{
    private _email!: string;
    private _phone!: string;

    constructor (email: string, phone: string)
    {
        this.email = email;
        this.phone = phone;
    }
    
    public get email(): string { return this._email;}
    public set email(value: string) { this._email = value;}
    public get phone(): string { return this._phone;}
    public set phone(value: string) { this._phone = value;}    
}