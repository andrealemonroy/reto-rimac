import React from 'react';
import './App.scss';
import { Header } from './components/layout/Header/Header';
import { Tag } from './components/molecules/Tag';
import { Form } from './components/organisms/Form/Form';
import { useForm } from 'react-hook-form';
import { Button } from './components/molecules/Button/Button';
import { Footer } from './components/layout/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useInsuranceApplication } from './redux/context/PlanContext';

function App() {
  const { updateRegistrationData, setCurrentUser, setAvailablePlans } = useInsuranceApplication();

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      document: 'dni',
      documentNumber: '',
      celular: '',
      privacidad: false,
      comerciales: false,
    },
  });

  const onSubmit = (data: any) => {
    updateRegistrationData(data);
    
    const currentUser = {
      name: 'Usuario',
      lastName: 'Temporal',
      birthDate: '1990-01-01',
      documentType: data.document,
      documentNumber: data.documentNumber,
      phoneNumber: data.celular,
      hasAcceptedPrivacyPolicy: data.privacidad,
      hasAcceptedCommercialPolicy: data.comerciales,
    };
    
    const samplePlans = [
      {
        id: '1',
        name: 'Plan en Casa',
        monthlyPrice: 39,
        benefits: [
          'Médico general a domicilio por S/20 y medicinas cubiertas al 100%.',
          'Videoconsulta y orientación telefónica al 100% en medicina general + pediatría.',
          'Indemnización de S/300 en caso de hospitalización por más de un día.'
        ],
        minimumAge: 18,
        maximumAge: 65,
        category: 'basic' as const,
        isRecommended: false,
        iconUrl: 'plan-en-casa.svg'
      },
      {
        id: '2', 
        name: 'Plan en Casa y Clínica',
        monthlyPrice: 99,
        benefits: [
          'Consultas en clínica para cualquier especialidad.',
          'Medicinas y exámenes derivados cubiertos al 80%',
          'Atención médica en más de 200 clínicas del país.'
        ],
        minimumAge: 18,
        maximumAge: 65,
        category: 'standard' as const,
        isRecommended: true,
        iconUrl: 'plan-en-casa-y-clínica.svg'
      },
      {
        id: '3',
        name: 'Plan en Casa + Chequeo', 
        monthlyPrice: 49,
        benefits: [
          'Un Chequeo preventivo general de manera presencial o virtual.',
          'Acceso a Vacunas en el Programa del MINSA en centros privados.',
          'Incluye todos los beneficios del plan en casa.'
        ],
        minimumAge: 18,
        maximumAge: 65,
        category: 'premium' as const,
        isRecommended: false,
        iconUrl: 'plan-en-casa-+-chequeo-.svg'
      }
    ];
    
    setCurrentUser(currentUser);
    setAvailablePlans(samplePlans);
    navigate('/planes');
  };

  const onError = (errors: any) => {
    Object.keys(errors).forEach(field => {
    });
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
            onSubmit={form.handleSubmit(onSubmit, onError)}
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
                  label: 'Acepto la Política de Privacidad',
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
            <Button type="submit" color="secondary">Cotiza aquí</Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
