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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe_Payment_Card_Token = void 0;
const YCPGW_Payment_Execute_1 = require("../../../core/YCPGW_Payment_Execute");
const util_1 = require("../util");
class Stripe_Payment_Card_Token extends YCPGW_Payment_Execute_1.YCPGW_Payment_Execute {
    // override
    Card_Token_Fetch(txInfo, reuseInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new util_1.Stripe_SDK().createCardToken(txInfo, reuseInfo);
        });
    }
}
exports.Stripe_Payment_Card_Token = Stripe_Payment_Card_Token;
