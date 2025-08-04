"use strict";
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
exports.__esModule = true;
exports.Form = void 0;
var react_1 = require("react");
var Card_1 = require("../Card");
require("./Form.scss");
exports.Form = function (_a) {
    var formInputs = _a.formInputs, form = _a.form;
    var register = form.register, errors = form.formState.errors, watch = form.watch;
    var documentType = watch('document');
    var selectedCard = watch('cardSelection');
    return formInputs.map(function (input, index) {
        var inputElement = null;
        switch (input.type) {
            case 'document':
                inputElement = (react_1["default"].createElement("div", { className: "input-group-container" },
                    react_1["default"].createElement("div", { className: "input-group" },
                        react_1["default"].createElement("div", { className: "input-group__select" },
                            react_1["default"].createElement("select", __assign({}, register(input.name, {
                                required: 'Este campo es obligatorio'
                            }), { className: "input-group__select-field" }),
                                react_1["default"].createElement("option", { value: "dni" }, "DNI"),
                                react_1["default"].createElement("option", { value: "ce" }, "CE"),
                                react_1["default"].createElement("option", { value: "pasaporte" }, "Pasaporte")),
                            react_1["default"].createElement("img", { src: "images/arrow-down.svg", alt: "arrow-down", className: "input-group__select-arrow" })),
                        react_1["default"].createElement("div", { className: "input-group__input" },
                            react_1["default"].createElement("label", { htmlFor: "documentNumber", className: "input-group__input-label" }, input.label),
                            react_1["default"].createElement("input", __assign({}, register('documentNumber', {
                                required: 'Este campo es obligatorio',
                                validate: function (value) {
                                    if (documentType === 'dni') {
                                        return (/^[0-9]{8}$/.test(value) ||
                                            'El DNI debe tener 8 dígitos y ser solo números.');
                                    }
                                    else if (documentType === 'ce' ||
                                        documentType === 'pasaporte') {
                                        return (value.length <= 20 ||
                                            'CE o Pasaporte debe tener máximo 20 dígitos.');
                                    }
                                    return true;
                                }
                            }), { type: "text", id: "documentNumber", className: "input-group__input-field", name: "documentNumber" })))),
                    errors.documentNumber && (react_1["default"].createElement("p", { className: "error-message" }, errors.documentNumber.message))));
                break;
            case 'number':
                inputElement = (react_1["default"].createElement("div", { className: "input-group-container" },
                    react_1["default"].createElement("div", { className: "input-group__input rounded " + (errors[input.name] ? 'input-error' : '') },
                        react_1["default"].createElement("label", { htmlFor: input.name, className: "input-group__input-label" }, input.label),
                        react_1["default"].createElement("input", __assign({}, register(input.name, {
                            required: 'Este campo es obligatorio',
                            minLength: {
                                value: 9,
                                message: 'El celular debe tener 9 dígitos.'
                            },
                            maxLength: {
                                value: 9,
                                message: 'El celular debe tener 9 dígitos.'
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Solo se permiten números.'
                            }
                        }), { type: "text", id: input.name, className: "input-group__input-field", name: input.name }))),
                    errors[input.name] && (react_1["default"].createElement("p", { className: "error-message" }, errors[input.name].message))));
                break;
            case 'checkbox':
                inputElement = (react_1["default"].createElement("div", { className: "input-group__checkbox-container" },
                    react_1["default"].createElement("div", { className: "input-group__checkbox" },
                        react_1["default"].createElement("input", __assign({}, register(input.name, {
                            required: 'Este campo es obligatorio'
                        }), { type: "checkbox", id: input.name, className: "input-group__checkbox-field", name: input.name })),
                        react_1["default"].createElement("span", { className: "input-group__checkbox__checkmark" }),
                        react_1["default"].createElement("label", { htmlFor: input.name, className: "input-group__checkbox-label" }, input.label)),
                    errors[input.name] && (react_1["default"].createElement("p", { className: "error-message" }, errors[input.name].message))));
                break;
            case 'card-radio':
                inputElement = (react_1["default"].createElement(Card_1.CardSelection, __assign({}, input, { register: register, selectedValue: selectedCard })));
                break;
        }
        return react_1["default"].createElement("div", { key: index }, inputElement);
    });
};
