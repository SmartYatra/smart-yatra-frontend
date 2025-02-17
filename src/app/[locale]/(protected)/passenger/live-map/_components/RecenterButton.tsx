import { useMap } from 'react-leaflet';

import { Button } from '@/components/ui/button';

interface IRecenterButtonProps {
  userLocation: { lat: number; lng: number };
}

const RecenterButton = ({ userLocation }: IRecenterButtonProps) => {
  const map = useMap();

  const handleCenterOnMe = () => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], map.getZoom());
    }
  };

  return (
    <Button
      className='absolute right-5 top-5 z-[1000] size-fit ring-8'
      variant={'default'}
      onClick={handleCenterOnMe}
    >
      Center on Me
    </Button>
  );
};

export default RecenterButton;
