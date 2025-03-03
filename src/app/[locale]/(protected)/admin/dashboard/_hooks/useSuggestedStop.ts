import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

// GALLI_MAPS_KEY
export const useSuggestedStop = ({ query }: { query?: string }) => {
  return useQuery({
    queryKey: ['suggested-stops', query],
    queryFn: async () => {
      const res = await axios.get(
        // `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        `https://route-init.gallimap.com/api/v1/search/autocomplete?accessToken=[ACCESS-TOKEN]&word=[SEARCH-QUERY-STRING]&lat=[CURRENT-LOCATION-LATITUDE]&lng=[CURRENT-LOCATION-LONGITUDE]`
      );
      return res.data;
    },
    enabled: !!query,
  });
};
