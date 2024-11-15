"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fiserv_Payment_Card_Token = void 0;
const YCPGW_Payment_Execute_1 = require("../../../core/YCPGW_Payment_Execute");
const util_1 = require("../util");
const Fiserv_Config_1 = __importDefault(require("../model/Fiserv_Config"));
const YCPGW_General_Method_1 = require("../../../util_common/YCPGW_General_Method");
class Fiserv_Payment_Card_Token extends YCPGW_Payment_Execute_1.YCPGW_Payment_Execute {
    // override
    Card_Token_Fetch(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (reuseInfo === null || reuseInfo === void 0 ? void 0 : reuseInfo.customerInfo)
                console.warn(this.WARNNING_CUSTOMER_INFO_ERROR);
            if (!this.fiservHttpHelper)
                this.fiservHttpHelper = new util_1.Fiserv_Http_Helper();
            const reqBody = new util_1.Fiserv_Body_Generator().fetchCardTokenBody(txInfo, reuseInfo);
            const header = new util_1.Fiserv_Header_Generator().fetchHeader(reqBody);
            let cardInfo = txInfo.senderInfo;
            const numberOfCard = cardInfo.number + cardInfo.expiryMonth + cardInfo.expiryYear + cardInfo.securityCode;
            const cardEncode = (0, YCPGW_General_Method_1.createHashBase64)(numberOfCard, Fiserv_Config_1.default.FISERV_API_SECRET, this.GENERAL_SHA256);
            return yield this.fiservHttpHelper.executePost(this.ENDPOINT_FISERV_PAYMENT_TOKENS, reqBody, header, cardEncode);
        });
    }
}
exports.Fiserv_Payment_Card_Token = Fiserv_Payment_Card_Token;
