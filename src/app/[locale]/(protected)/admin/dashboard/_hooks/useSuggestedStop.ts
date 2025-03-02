import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

export const useSuggestedStop = ({ query }: { query?: string }) => {
  return useQuery({
    queryKey: ['suggested-stops', query],
    queryFn: async () => {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      return res.data;
    },
    enabled: !!query,
  });
};
