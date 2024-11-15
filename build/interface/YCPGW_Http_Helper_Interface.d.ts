interface YCPGW_Http_Helper_Interface {
    executeGet(endpoint: string, header: any): any;
    executePost(endpoint: string, body: string, header: any): any;
    executePatch(): void;
}
