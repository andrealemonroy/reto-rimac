"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.apiService = exports.insuranceApiService = exports.InsuranceApiService = exports.ApiError = void 0;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(message, statusCode, code) {
        var _this = _super.call(this, message) || this;
        _this.statusCode = statusCode;
        _this.code = code;
        _this.name = 'ApiError';
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
var InsuranceApiService = /** @class */ (function () {
    function InsuranceApiService(baseUrl) {
        this.cache = new Map();
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }
    InsuranceApiService.prototype.getCacheKey = function (url, method) {
        return method + ":" + url;
    };
    InsuranceApiService.prototype.getFromCache = function (key) {
        var entry = this.cache.get(key);
        if (!entry || Date.now() > entry.expiresAt) {
            this.cache["delete"](key);
            return null;
        }
        return entry.data;
    };
    InsuranceApiService.prototype.setCache = function (key, data, duration) {
        this.cache.set(key, {
            data: data,
            expiresAt: Date.now() + duration
        });
    };
    InsuranceApiService.prototype.get = function (endpoint, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var url, cacheKey, cached, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "" + this.baseUrl + endpoint;
                        cacheKey = this.getCacheKey(url, 'GET');
                        if (config.enableCaching !== false) {
                            cached = this.getFromCache(cacheKey);
                            if (cached)
                                return [2 /*return*/, cached];
                        }
                        return [4 /*yield*/, fetch(url, {
                                method: 'GET',
                                headers: __assign({ 'Content-Type': 'application/json' }, config.headers)
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new ApiError("HTTP " + response.status + ": " + response.statusText, response.status);
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (config.enableCaching !== false) {
                            this.setCache(cacheKey, data, config.cacheDurationMs || 300000);
                        }
                        return [2 /*return*/, data];
                }
            });
        });
    };
    InsuranceApiService.prototype.post = function (endpoint, body, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, Promise, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "" + this.baseUrl + endpoint;
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                headers: __assign({ 'Content-Type': 'application/json' }, config.headers),
                                body: body ? JSON.stringify(body) : undefined
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new ApiError("HTTP " + response.status + ": " + response.statusText, response.status);
                        }
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    InsuranceApiService.prototype.clearCache = function () {
        this.cache.clear();
    };
    InsuranceApiService.prototype.fetchUserData = function () {
        return __awaiter(this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get('/user.json')];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.user || response];
                }
            });
        });
    };
    InsuranceApiService.prototype.fetchInsurancePlans = function (filters) {
        return __awaiter(this, void 0, Promise, function () {
            var endpoint, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = (filters === null || filters === void 0 ? void 0 : filters.minAge) ? "/plans.json?minAge=" + filters.minAge : '/plans.json';
                        return [4 /*yield*/, this.get(endpoint)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.plans || response.list || []];
                }
            });
        });
    };
    return InsuranceApiService;
}());
exports.InsuranceApiService = InsuranceApiService;
exports.insuranceApiService = new InsuranceApiService(process.env.REACT_APP_API_URL || '');
exports.apiService = exports.insuranceApiService;
