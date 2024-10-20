import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MissionVisionTabs = () => {
  return (
    <Tabs className="mb-12" defaultValue="mission">
      <TabsList className="grid h-11 w-full grid-cols-2">
        <TabsTrigger className="h-full" value="mission">
          Our Mission
        </TabsTrigger>
        <TabsTrigger className="h-full" value="vision">
          Our Vision
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mission">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              At SmartYatra, we're committed to transforming public transport through cutting-edge
              technology...
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="vision">
        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              We envision a future where public transportation is the preferred choice for urban
              mobility...
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default MissionVisionTabs;
