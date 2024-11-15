"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe_Header_Generator = void 0;
const YCPGW_Lib_Internal_1 = require("../../../model/YCPGW_Lib_Internal");
const Stripe_Config_1 = __importDefault(require("./../model/Stripe_Config"));
class Stripe_Header_Generator extends YCPGW_Lib_Internal_1.YCPGW_Lib_Internal {
    constructor() {
        super();
        this.apiKey = Stripe_Config_1.default.STRIPE_API_KEY;
    }
    fetchHeader() {
        return {
            headers: {
                "Content-Type": "pplication/x-www-form-urlencoded",
                "Authorization": `Bearer ${this.apiKey}`,
            }
        };
    }
}
exports.Stripe_Header_Generator = Stripe_Header_Generator;
