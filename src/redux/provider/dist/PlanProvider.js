"use strict";
exports.__esModule = true;
exports.PlanProvider = void 0;
var react_1 = require("react");
var PlanContext_1 = require("../context/PlanContext");
var InsuranceApplicationWrapper = function (_a) {
    var children = _a.children;
    return (react_1["default"].createElement(PlanContext_1.InsuranceApplicationProvider, null, children));
};
exports.PlanProvider = InsuranceApplicationWrapper;
exports["default"] = InsuranceApplicationWrapper;
