'use client';

import { Container } from './container';
import { Title } from './title';
import { PlanCard } from './plan-card';
import { PlanWithFeatures } from '@/@types/prisma';

interface PlansProps {
  plans: PlanWithFeatures[];
}

export const Plans: React.FC<PlansProps> = ({ plans }) => {
  return (
    <Container className="my-6 sm:my-8 lg:my-10">
      <Title text="Выберите тариф" size="md" className="font-bold mb-6 sm:mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {plans.map(plan => (
          <PlanCard
            key={plan.id}
            id={plan.id}
            title={plan.title}
            description={plan.description}
            price={plan.price}
            oldPrice={plan.oldPrice ?? undefined}
            highlighted={plan.highlighted}
            features={plan.features}
          />
          
        ))}
      </div>
    </Container>
  );
};