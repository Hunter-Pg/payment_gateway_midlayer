export declare class YCPGW_Customer_info {
    private _name?;
    private _email?;
    private _customerId?;
    constructor(customerId: string);
    constructor(name: string, email: string);
    constructor(customerId: string, name: string, email: string);
    get email(): string | undefined;
    set email(value: string | undefined);
    get name(): string | undefined;
    set name(value: string | undefined);
    get customerId(): string | undefined;
    set customerId(value: string | undefined);
}
