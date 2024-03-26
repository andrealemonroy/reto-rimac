import React, { useContext } from 'react';
import './App.scss';
import { Header } from './components/layout/Header/Header';
import { Tag } from './components/molecules/Tag';
import { Form } from './components/organisms/Form/Form';
import { useForm } from 'react-hook-form';
import { Button } from './components/molecules/Button/Button';
import { Footer } from './components/layout/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import PlanContext from './redux/context/PlanContext';

function App() {
  const { setUserData } = useContext(PlanContext);

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      document: 'dni',
      celular: '',
      privacidad: false,
      comerciales: false,
    },
  });

  const onSubmit = (data: any) => {
    setUserData(data);
    navigate('/planes');
  };

  return (
    <div className="page-container">
      <Header />
      <div className="main">
        <div className="main__title">
          <div className="main__title-text">
            <Tag>Seguro Salud Flexible</Tag>
            <h1>Creado para ti y tu familia</h1>
          </div>
          <img src="./images/hero-image.png" alt="hero" className="hero-img" />
        </div>
        <img src="./images/hero-image.png" alt="hero" className="hero-img" />
        <div className="form-container">
          <div className="form-container__title">
            <Tag>Seguro Salud Flexible</Tag>
            <h1>Creado para ti y tu familia</h1>
          </div>
          <p>
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
            asesoría. 100% online.
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form-container__form"
          >
            <Form
              formInputs={[
                {
                  type: 'document',
                  label: 'Nro. de Documento',
                  name: 'document',
                },
                { name: 'celular', label: 'Celular', type: 'number' },
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
            <Button type="submit">Cotiza aquí</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
