// CardDescription.tsx
import React from 'react';
import './CardDescription.scss';
import { Button } from '../../molecules/Button';
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
                  ${showDiscount} antes
                </span>
              )}
            </div>
            <div className="card-description__header-info__cost-value">
              {cost}
            </div>
          </div>
        </div>
        <div className="card-description__header-icon">
          <img src={`/images/${icon}`} alt={title} />
        </div>
      </div>
      <ul className="card-description__benefits">
        {benefits.map((benefit: string, index: number) => (
          <li key={index} className="card-description__benefit">
            {benefit}
          </li>
        ))}
      </ul>
      <div className="card-description__footer">
        <Button onClick={onSelectPlan} color="primary">
          Seleccionar Plan
        </Button>
      </div>
    </div>
  );
};
