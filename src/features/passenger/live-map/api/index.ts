import { adapter, mockApi } from '@/lib/api-client';

export type Bus = {
  id: string;
  lat: number;
  lng: number;
  route: string;
  type: string;
  speed: number;
  eta: number;
  occupancy: string;
};

// Mock data for buses
const mockBuses: Array<Bus> = [
  {
    id: 'bus1',
    lat: 27.7172,
    lng: 85.324,
    route: 'Ring Road',
    type: 'Electric Bus',
    speed: 50, // in km/h
    eta: 5, // in minutes
    occupancy: '50/60',
  },
  {
    id: 'bus2',
    lat: 27.671,
    lng: 85.4298,
    route: 'Patan to Bhaktapur',
    type: 'Diesel Bus',
    speed: 40,
    eta: 15,
    occupancy: '30/50',
  },
  {
    id: 'bus3',
    lat: 27.7052,
    lng: 85.335,
    route: 'Thamel to Airport',
    type: 'Standard Bus',
    speed: 30,
    eta: 10,
    occupancy: '40/50',
  },
  {
    id: 'bus4',
    lat: 27.6878,
    lng: 85.3165,
    route: 'Kalanki to Ratnapark',
    type: 'Electric Bus',
    speed: 45,
    eta: 7,
    occupancy: '20/40',
  },
  {
    id: 'bus5',
    lat: 27.7048,
    lng: 85.3089,
    route: 'Gongabu to Jawalakhel',
    type: 'Standard Bus',
    speed: 35,
    eta: 12,
    occupancy: '25/50',
  },
];

// Mock the `/api/buses` endpoint
adapter.onGet('/api/buses').reply(200, mockBuses);

export const fetchBuses = async (): Promise<Array<Bus>> => {
  const response = await mockApi.get('/api/buses');

  return response.data;
};
