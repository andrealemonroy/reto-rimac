import React from 'react';
import './CardDescription.scss';
import { Button } from '../../molecules/Button/Button';
import { Tag } from '../../molecules/Tag';

export interface CardDescriptionProps {
  title: string;
  cost: string;
  benefits: string[];
  isRecommended?: boolean;
  onSelectPlan: () => void;
  icon?: string;
  showDiscount?: string | null;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  title,
  cost,
  benefits,
  isRecommended = false,
  onSelectPlan,
  icon,
  showDiscount,
}) => {
  return (
    <div className={`card-description`}>
      <div className="card-description__tag">
        {isRecommended && <Tag>Plan recomendado</Tag>}
      </div>
      <div className="card-description__header">
        <div className="card-description__header-info">
          <h3 className="card-description__title">{title}</h3>
          <div className="card-description__header-info__cost">
            <div className="card-description__header-info__cost-title">
              Costo del plan
            </div>
            <div className="card-description__header-info__cost-discount">
              {showDiscount && (
                <span className="card-description__header-info__cost-discount--line-through">
                  {showDiscount} antes
                </span>
              )}
            </div>
            <div className="card-description__header-info__cost-value">
              {cost}
            </div>
          </div>
        </div>
        <div className="card-description__header-icon">
          <img src={icon ? `/images/${icon}` : '/images/default-plan.svg'} alt={title} />
        </div>
      </div>
      <ul className="card-description__benefits">
        {benefits.map((benefit: string, index: number) => {
          const boldPhrases = [
            'Médico general a domicilio',
            'Videoconsulta',
            'Indemnización',
            'Consultas en clínica',
            'Medicinas y exámenes',
            'más de 200 clínicas del país',
            'Un Chequeo preventivo general',
            'Vacunas',
            'Incluye todos los beneficios del plan en casa'
          ];
          
          const formatBenefit = (text: string) => {
            let formattedText = text;
            boldPhrases.forEach(phrase => {
              const regex = new RegExp(`(${phrase})`, 'gi');
              formattedText = formattedText.replace(regex, '<strong>$1</strong>');
            });
            return formattedText;
          };
          
          return (
            <li 
              key={index} 
              className="card-description__benefit"
              dangerouslySetInnerHTML={{ __html: formatBenefit(benefit) }}
            />
          );
        })}
      </ul>
      <div className="card-description__footer">
        <Button onClick={onSelectPlan} color="primary">
          Seleccionar Plan
        </Button>
      </div>
    </div>
  );
};
