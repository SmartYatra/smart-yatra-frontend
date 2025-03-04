import { QUERY_KEYS } from '@/constants/queryKeys';
import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export interface IPassengerTripStatus {
  boarding_time: string;
  alighting_time: string | null;
  boarding_stop: string;
  alighting_stop: string | null;
  bus: {
    id: number;
    bus_number: string;
    model: string;
    capacity: number;
    status: 'active';
    latitude: number | null;
    geohash: number | null;
    longitude: number | null;
    created_at: string;
    updated_at: string;
    driver_id: number;
    route_id: number;
  };
}

export const usePassengerTripStatus = () => {
  return useQuery<IPassengerTripStatus>({
    queryKey: [QUERY_KEYS.passenger_trip_status],
    queryFn: async () => {
      const response = await api.get('/trips/status');
      console.log(response.data);
      return response.data.data.length === 0 ? null : response.data.data;
    },
  });
};
