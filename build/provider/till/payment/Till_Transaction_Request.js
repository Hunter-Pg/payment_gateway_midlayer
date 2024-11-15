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
exports.Till_Transaction_Request = void 0;
const YCPGW_Payment_Execute_1 = require("../../../core/YCPGW_Payment_Execute");
const util_1 = require("../util");
const Till_Config_1 = __importDefault(require("../model/Till_Config"));
const Till_Http_Helper_1 = require("../util/Till_Http_Helper");
const YCPGW_General_Method_1 = require("../../../util_common/YCPGW_General_Method");
class Till_Transaction_Request extends YCPGW_Payment_Execute_1.YCPGW_Payment_Execute {
    constructor() {
        super();
        this.apiVersion = (0, YCPGW_General_Method_1.fetchExcludeMainDomain)(Till_Config_1.default.TILL_API_URL); // fetch "/api/v3"
        this.apiKey = Till_Config_1.default.TILL_API_KEY;
    }
    //override
    TX_Execute(amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = `${this.apiVersion}/${this.ENDPOINT_TILL_TRANSACTION}/${this.apiKey}/${this.ENDPOINT_TILL_TRANSACTION_DEBIT}`;
            return yield this.executeTransaction(action, amountInfo, txInfo);
        });
    }
    //override
    TX_Refund(transactionId, amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = `${this.apiVersion}/${this.ENDPOINT_TILL_TRANSACTION}/${this.apiKey}/${this.ENDPOINT_TILL_TRANSACTION_REFUND}`;
            if (txInfo)
                txInfo.transactionId = transactionId;
            return yield this.executeTransaction(action, amountInfo, txInfo);
        });
    }
    executeTransaction(actionEndpoint, amountInfo, txInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tillHttpHelper)
                this.tillHttpHelper = new Till_Http_Helper_1.Till_Http_Helper();
            const action = actionEndpoint;
            const reqBody = new util_1.Till_Body_Generator().fetchPaymentBody(amountInfo, txInfo);
            const header = new util_1.Till_Header_Generator().fetchHeader(reqBody, action);
            return yield this.tillHttpHelper.executePost(action, reqBody, header);
        });
    }
}
exports.Till_Transaction_Request = Till_Transaction_Request;
