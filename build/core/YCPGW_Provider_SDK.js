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
exports.YCPGW_Provider_SDK = void 0;
const YCPGW_Lib_Internal_1 = require("../model/YCPGW_Lib_Internal");
class YCPGW_Provider_SDK extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    fetchCardInformation(cardTokenInfo) { throw new Error(this.FUNCTION_NOT_IMOLEMENT); }
    createUserForProvider(userInfo) {
        return __awaiter(this, void 0, void 0, function* () { throw new Error(this.FUNCTION_NOT_IMOLEMENT); });
    }
    Card_Token_Fetch(txInfo) {
        return __awaiter(this, void 0, void 0, function* () { throw new Error(this.FUNCTION_NOT_IMOLEMENT); });
    }
}
exports.YCPGW_Provider_SDK = YCPGW_Provider_SDK;
