import { useForm } from 'react-hook-form';
import { Header } from '../components/layout/Header/Header';
import { Form } from '../components/organisms/Form/Form';
import { Stepper } from '../components/organisms/Stepper';
import { CardDescription } from '../components/organisms/CardDescription';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { calculateAge } from '../utils';
import PlanContext from '../redux/context/PlanContext';

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

interface PlansApiResponse {
  list: Plan[];
}
export default function Plans() {
  const { userData, setUserData, setPlanDetails } = useContext(PlanContext);

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
  const [availablePlans, setAvailablePlans] = useState<any[]>([]);
  const [userAge, setUserAge] = useState<number>(0);
  const cardSelection = form.watch('cardSelection');

  useEffect(() => {
    if(!userData) {
      navigate('/');
    }
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/user.json`
        );
        const user = await userResponse.json();
        const age = calculateAge(user.birthDay);
        setUserAge(age);
        setUserData((prevUserData) => ({ ...prevUserData, ...user }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/plans.json`
        );
        const data: PlansApiResponse = await response.json();
        setAvailablePlans(data.list.filter((plan) => plan.age >= userAge));
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    if (userData) {
      fetchPlans();
    }
  }, [userData]);

  const handleSelectPlan = (planName: string, planPrice: number) => {
    form.setValue('selectedPlan', planName);
    const planDetails = {
      name: planName,
      price: planPrice,
    };
    setPlanDetails(planDetails);

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
            {availablePlans.map((plan: any, index: number) => {
              const finalPrice =
                cardSelection === 'forSomeoneElse'
                  ? plan.price * 0.95
                  : plan.price;

              const priceBeforeDiscount =
                finalPrice !== plan.price ? plan.price : null;

              return (
                <CardDescription
                  key={index}
                  title={plan.name}
                  cost={`$${finalPrice} al mes`}
                  benefits={plan.description}
                  onSelectPlan={() => handleSelectPlan(plan.name, finalPrice)}
                  isRecommended={plan.name === 'Plan en Casa y Clínica'}
                  showDiscount={priceBeforeDiscount}
                  icon={plan.name.toLowerCase().replace(/\s+/g, '-') + '.svg'}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
