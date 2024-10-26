import FeatureImg from '@/assets/feature.webp';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FEATURES } from '@/constants/features';

const FeaturesSection = () => {
  const FIRST_FEATURE_ICON = FEATURES[0].icon;
  return (
    <section className="relative my-10 bg-accent/20 py-20" id="features">
      <div className="max-container max-w-7xl">
        <div className="mb-10 space-y-4 text-center">
          <h2 className="text-3xl font-semibold">Revolutionizing Public Transit</h2>
          <p className="mx-auto max-w-3xl">
            SmartYatra offers innovative solutions to transform public transportation, enhancing
            user experience through advanced technologies and efficient management systems.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:flex-row">
          <div className="grid w-full grid-cols-1 gap-6 md:w-1/2">
            <Card className="rounded-lg border border-primary/10 bg-background/50 shadow-sm">
              <CardHeader>
                <FIRST_FEATURE_ICON className="mb-4 h-10 w-10 text-primary" />

                <CardTitle className="text-xl font-semibold text-foreground">
                  {FEATURES[0].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{FEATURES[0].description}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {FEATURES.slice(1, 3).map((feature, index) => (
                <Card
                  key={index}
                  className="rounded-lg border border-primary/10 bg-background/50 shadow-sm"
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

          <div className="mt-12 flex items-center justify-center md:mt-0 md:w-1/2">
            <img
              alt="Placeholder"
              className="h-full w-full rounded-lg object-cover"
              src={FeatureImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
