import { Link, useNavigate } from 'react-router-dom';
import { Title_03 } from '../components/atoms/Typography/Typography';
import { Header } from '../components/layout/Header/Header';
import { Stepper } from '../components/organisms/Stepper';
import { useContext, useEffect } from 'react';
import PlanContext from '../redux/context/PlanContext';

export default function Summary() {
  const { userData, planDetails } = useContext(PlanContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!planDetails) {
      if (!userData?.document) {
        console.log(userData, 'IN');
        navigate('/');
      } else {
        navigate('/planes');
      }
    }
  }, [planDetails, userData]);

  if (!planDetails || !userData) {
    return null;
  }

  return (
    <div>
      <Header />
      <Stepper
        totalSteps={['Planes y coberturas', 'Resumen']}
        currentStep={2}
        backPath="/planes"
      />

      <div className="summary-container">
        <div className="back-button">
          <img src="/images/back-icon.svg" alt="Back icon" />
          <Link to="/planes">Volver</Link>
        </div>
        <div className="summary-container__title">
          <Title_03>Resumen del seguro</Title_03>
        </div>
        <div className="summary-container__content">
          <div className="summary-container__content__header">
            <div className="summary-container__content__header__headline">
              Precios calculados para:
            </div>
            <div className="summary-container__content__header__name">
              <img
                src="/images/family.svg"
                alt="User icon"
                className="summary-container__content__header__name__icon"
              />
              <p className="summary-container__content__header__name__text">
                {userData.name} {userData.lastName}
              </p>
            </div>
          </div>
          <div className="summary-container__content__body">
            <div className="summary-container__content__body__user">
              <div className="summary-container__content__body__user">
                <div className="summary-container__content__body__user__label">
                  Responsable de pago
                </div>
                <div className="summary-container__content__body__user__value">
                  {userData.document?.toUpperCase()}: {userData.documentNumber}
                </div>
                <div className="summary-container__content__body__user__value">
                  Celular: {userData.celular}
                </div>
              </div>
            </div>
            <div className="summary-container__content__body__plan">
              <div className="summary-container__content__body__plan">
                <div className="summary-container__content__body__plan__label">
                  Plan elegido
                </div>
                <div className="summary-container__content__body__plan__value">
                  {planDetails.name}
                </div>
                <div className="summary-container__content__body__plan__value">
                  Costo del Plan: ${planDetails.price} al mes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
