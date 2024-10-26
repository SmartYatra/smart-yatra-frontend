import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FEATURES } from '@/constants/features';

const FeaturesSection = () => {
  return (
    <section className="bg-card px-4 py-20 sm:px-6 lg:px-8" id="features">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-3xl font-bold text-foreground sm:text-4xl">
          Transforming Public Transport
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              className="border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <feature.icon className="mb-4 h-10 w-10 text-primary" />
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
