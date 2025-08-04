import { Link, useNavigate } from 'react-router-dom';
import { Title03 } from '../components/atoms/Typography/Typography';
import { Header } from '../components/layout/Header/Header';
import { Stepper } from '../components/organisms/Stepper';
import { useEffect } from 'react';
import { useInsuranceApplication } from '../redux/context/PlanContext';

export default function Summary() {
  const { state } = useInsuranceApplication();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.plans.selectedPlan) {
      if (!state.user.currentUser) {
        navigate('/');
      } else {
        navigate('/planes');
      }
    }
  }, [state.plans.selectedPlan, state.user.currentUser, navigate]);

  if (!state.plans.selectedPlan || !state.user.currentUser) {
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
          <Title03>Resumen del seguro</Title03>
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
                {state.user.currentUser.name} {state.user.currentUser.lastName}
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
                  {state.user.currentUser.documentType?.toUpperCase()}: {state.user.currentUser.documentNumber}
                </div>
                <div className="summary-container__content__body__user__value">
                  Celular: {state.user.currentUser.phoneNumber}
                </div>
              </div>
            </div>
            <div className="summary-container__content__body__plan">
              <div className="summary-container__content__body__plan">
                <div className="summary-container__content__body__plan__label">
                  Plan elegido
                </div>
                <div className="summary-container__content__body__plan__value">
                  {state.plans.selectedPlan.planName}
                </div>
                <div className="summary-container__content__body__plan__value">
                  Costo del Plan: ${state.plans.selectedPlan.finalPrice} al mes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
