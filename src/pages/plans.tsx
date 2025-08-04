import { useForm } from 'react-hook-form';
import { Header } from '../components/layout/Header/Header';
import { Form } from '../components/organisms/Form/Form';
import { Stepper } from '../components/organisms/Stepper';
import { CardDescription } from '../components/organisms/CardDescription';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateAge } from '../utils';
import { useInsuranceApplication } from '../redux/context/PlanContext';
import { InsurancePlan } from '../types';

export default function Plans() {
  const { state, setSelectedPlan } = useInsuranceApplication();

  const formInputs = [
    {
      type: 'card-radio',
      label: 'Para mí',
      description:
        'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
      id: 'forMe',
      name: 'cardSelection',
      icon: 'plan-for-me.svg',
    },
    {
      type: 'card-radio',
      label: 'Para alguien más',
      description:
        'Realiza una cotización para uno de tus familiares o cualquier persona.',
      id: 'forSomeoneElse',
      name: 'cardSelection',
      icon: 'plan-for-someone-else.svg',
    },
  ];
  const form = useForm();
  const navigate = useNavigate();
  const [userAge, setUserAge] = useState<number>(0);
  const cardSelection = form.watch('cardSelection');
  useEffect(() => {
    if (!state.user.currentUser) {
      navigate('/');
    } else {
      const age = calculateAge(state.user.currentUser.birthDate);
      setUserAge(age);
    }
  }, [state.user.currentUser, navigate]);

  useEffect(() => {
    if (state.user.currentUser && userAge > 0) {
    }
  }, [state.user.currentUser, userAge]);

  const handleSelectPlan = (planName: string, planPrice: number) => {
    form.setValue('selectedPlan', planName);
    const planDetails = {
      planId: planName,
      planName: planName,
      finalPrice: planPrice,
      originalPrice: planPrice,
      selectedAt: new Date().toISOString(),
    };
    setSelectedPlan(planDetails);

    navigate('/resumen');
  };

  return (
    <div>
      <Header />
      <Stepper
        totalSteps={['Planes y coberturas', 'Resumen']}
        currentStep={1}
      />
      <div className="plans-container">
        <div className="back-button">
          <img src="/images/back-icon.svg" alt="Back icon" />
          <Link to="/">Volver</Link>
        </div>
        <div className="plans-container__header">
          <h2 className="plans-container__header-title">
            Rocío ¿Para quién deseas cotizar?
          </h2>
          <p className="plans-container__header-description">
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </div>
        <div className="plans-container__form">
          <Form formInputs={formInputs} form={form} />
        </div>
        {cardSelection && (
          <div className="plans-container__cards">
            {state.plans.availablePlans.map((plan: InsurancePlan, index: number) => {
              const finalPrice =
                cardSelection === 'forSomeoneElse'
                  ? plan.monthlyPrice * 0.95
                  : plan.monthlyPrice;

              const priceBeforeDiscount =
                finalPrice !== plan.monthlyPrice ? plan.monthlyPrice : null;

              return (
                <CardDescription
                  key={index}
                  title={plan.name}
                  cost={`$${finalPrice} al mes`}
                  benefits={plan.benefits}
                  onSelectPlan={() => handleSelectPlan(plan.name, finalPrice)}
                  isRecommended={plan.isRecommended}
                  showDiscount={priceBeforeDiscount ? `$${priceBeforeDiscount}` : null}
                  icon={plan.iconUrl || plan.name.toLowerCase().replace(/\s+/g, '-') + '.svg'}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
