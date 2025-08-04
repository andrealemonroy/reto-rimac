"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var react_hook_form_1 = require("react-hook-form");
var Form_1 = require("./Form");
var TestFormWrapper = function (_a) {
    var formInputs = _a.formInputs, onSubmit = _a.onSubmit;
    var form = react_hook_form_1.useForm({
        defaultValues: {
            document: 'dni',
            documentNumber: '',
            celular: '',
            privacidad: false,
            comerciales: false,
            cardSelection: ''
        }
    });
    return (react_1["default"].createElement("form", { onSubmit: form.handleSubmit(onSubmit) },
        react_1["default"].createElement(Form_1.Form, { formInputs: formInputs, form: form }),
        react_1["default"].createElement("button", { type: "submit" }, "Submit")));
};
describe('Form Component', function () {
    var mockOnSubmit = jest.fn();
    beforeEach(function () {
        mockOnSubmit.mockClear();
    });
    it('renders form inputs correctly', function () {
        var formInputs = [
            {
                type: 'document',
                label: 'Nro. de Documento',
                name: 'document'
            },
            {
                type: 'number',
                label: 'Celular',
                name: 'celular'
            },
        ];
        react_2.render(react_1["default"].createElement(TestFormWrapper, { formInputs: formInputs, onSubmit: mockOnSubmit }));
        expect(react_2.screen.getByLabelText(/nro\. de documento/i)).toBeInTheDocument();
        expect(react_2.screen.getByLabelText(/celular/i)).toBeInTheDocument();
    });
});
