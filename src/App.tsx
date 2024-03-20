import React from 'react';
import './App.scss';
import { Header } from './components/layout/Header';
import { Tag } from './components/molecules/Tag';
import { Form } from './components/organisms/Form';
import { useForm } from 'react-hook-form';
import { Button } from './components/molecules/Button';
import { Footer } from './components/layout/Footer';

function App() {
  const form = useForm();
  return (
    <div className="page-container">
      <Header />
      <div className="main">
        <img src="./images/hero-image.png" alt="hero" className='hero-img' />
        <div className="form-container">
          <Tag>Seguro Salud Flexible</Tag>
          <h1>Creado para ti y tu familia</h1>
          <p>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
            asesoría. 100% online.
          </p>
          <div className="form-container__form">
            <Form
              formInputs={[
                {
                  type: 'document',
                  label: 'Nro. de Documento',
                  name: 'document',
                },
                {
                  name: 'celular',
                  label: 'Celular',
                  type: 'number',
                },
                {
                  name: 'privacidad',
                  label: 'Acepto lo Política de Privacidad',
                  type: 'checkbox',
                },
                {
                  name: 'comerciales',
                  label: 'Acepto la Política Comunicaciones Comerciales',
                  type: 'checkbox',
                },
              ]}
              form={form}
            />
            <p className="form-container__terms">
              Aplican Términos y Condiciones.
            </p>
            <Button onClick={form.handleSubmit(() => console.log('submit'))}>
              Cotiza aquí
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
