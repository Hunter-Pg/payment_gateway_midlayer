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
exports.YCPGW_Http_Helper = void 0;
const axios_1 = __importDefault(require("axios"));
const YCPGW_Lib_Internal_1 = require("../model/YCPGW_Lib_Internal");
class YCPGW_Http_Helper extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    executeGet(endpoint, header) {
        return __awaiter(this, void 0, void 0, function* () {
            //DEBUG
            if (this.DEBUG_MODE)
                this.deBugMode(endpoint, undefined, header);
            return yield axios_1.default.get(endpoint, header)
                .then(res => res)
                .catch(error => error);
        });
    }
    executePost(endpoint, body, header, fingerprint) {
        return __awaiter(this, void 0, void 0, function* () {
            //DEBUG
            if (this.DEBUG_MODE)
                this.deBugMode(endpoint, body, header);
            return yield axios_1.default.post(endpoint, body, header)
                .then(res => res)
                .catch(error => error);
        });
    }
    executePatch() {
        throw new Error("Method not implemented.");
    }
    deBugMode(endpoint, body, header) {
        console.log("::> YCPGW > endpoint: ", endpoint);
        console.log("::> YCPGW > header: ", JSON.stringify(header));
        console.log("::> YCPGW > body: ", JSON.stringify(body));
    }
}
exports.YCPGW_Http_Helper = YCPGW_Http_Helper;
