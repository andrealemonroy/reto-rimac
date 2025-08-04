import React from 'react';
import { CardSelection } from '../Card';
import './Form.scss';

export const Form = ({ formInputs, form }: { formInputs: any; form: any }) => {
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const documentType = watch('document');

  const selectedCard = watch('cardSelection');

  return formInputs.map((input: any, index: number) => {
    let inputElement = null;

    switch (input.type) {
      case 'document':
        inputElement = (
          <div className="input-group-container">
            <div className="input-group">
              <div className="input-group__select">
                <select
                  {...register(input.name, {
                    required: 'Este campo es obligatorio',
                  })}
                  className="input-group__select-field"
                >
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
                  {...register('documentNumber', {
                    required: 'Este campo es obligatorio',
                    validate: (value: string) => {
                      if (documentType === 'dni') {
                        return (
                          /^[0-9]{8}$/.test(value) ||
                          'El DNI debe tener 8 dígitos y ser solo números.'
                        );
                      } else if (
                        documentType === 'ce' ||
                        documentType === 'pasaporte'
                      ) {
                        return (
                          value.length <= 20 ||
                          'CE o Pasaporte debe tener máximo 20 dígitos.'
                        );
                      }
                      return true;
                    },
                  })}
                  type="text"
                  id="documentNumber"
                  className="input-group__input-field"
                  name="documentNumber"
                />
              </div>
            </div>
            {errors.documentNumber && (
              <p className="error-message">{errors.documentNumber.message}</p>
            )}
          </div>
        );
        break;
      case 'number':
        inputElement = (
          <div className="input-group-container">
            <div
              className={`input-group__input rounded ${
                errors[input.name] ? 'input-error' : ''
              }`}
            >
              <label htmlFor={input.name} className="input-group__input-label">
                {input.label}
              </label>
              <input
                {...register(input.name, {
                  required: 'Este campo es obligatorio',
                  minLength: {
                    value: 9,
                    message: 'El celular debe tener 9 dígitos.',
                  },
                  maxLength: {
                    value: 9,
                    message: 'El celular debe tener 9 dígitos.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Solo se permiten números.',
                  },
                })}
                type="text"
                id={input.name}
                className="input-group__input-field"
                name={input.name}
              />
            </div>
            {errors[input.name] && (
              <p className="error-message">{errors[input.name].message}</p>
            )}
          </div>
        );
        break;
      case 'checkbox':
        inputElement = (
          <div className="input-group__checkbox-container">
            <div className="input-group__checkbox">
              <input
                {...register(input.name, {
                  required: 'Este campo es obligatorio',
                })}
                type="checkbox"
                id={input.name}
                className="input-group__checkbox-field"
                name={input.name}
              />
              <span className="input-group__checkbox__checkmark"></span>
              <label
                htmlFor={input.name}
                className="input-group__checkbox-label"
              >
                {input.label}
              </label>
            </div>
            {errors[input.name] && (
              <p className="error-message">{errors[input.name].message}</p>
            )}
          </div>
        );
        break;
      case 'card-radio':
        inputElement = (
          <CardSelection
            {...input}
            register={register}
            selectedValue={selectedCard}
          />
        );
        break;
    }

    return <div key={index}>{inputElement}</div>;
  });
};
