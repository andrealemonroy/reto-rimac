import React from 'react';

export const Form = ({ formInputs, form }: { formInputs: any; form: any }) => {
  return formInputs.map((input: any) => {
    if (input.type == 'document') {
      return (
        <div className="input-group">
          <div className="input-group__select">
            <select className="input-group__select-field">
              <option value="dni">DNI</option>
              <option value="ce">CE</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
            <img
              src="images/arrow-down.svg"
              alt="arrow-down"
              className="input-group__select-arrow"
            />
          </div>
          <div className="input-group__input">
            <label
              htmlFor="documentNumber"
              className="input-group__input-label"
            >
              {input.label}
            </label>
            <input
              type="text"
              id="documentNumber"
              className="input-group__input-field"
              name={input.name}
            />
          </div>
        </div>
      );
    } else if (input.type == 'checkbox') {
      return (
        <div className="input-group__checkbox" key={input.name} id={input.name}>
          <input
            type="checkbox"
            name={input.name}
            className="input-group__checkbox-field"
          />
          <span className="input-group__checkbox__checkmark">
          </span>
          <label htmlFor={input.name} className="input-group__checkbox-label">
            {input.label}
          </label>
        </div>
      );
    } else {
      return (
        <div className="input-group__input rounded" key={input.name}>
          <label htmlFor={input.name} className="input-group__input-label">
            {input.label}
          </label>
          <input
            type={input.type}
            id={input.name}
            name={input.name}
            value={form[input.name]}
            className="input-group__input-field"
            onChange={(e) => form.setInput(e.target.value)}
          />
        </div>
      );
    }
  });
};
