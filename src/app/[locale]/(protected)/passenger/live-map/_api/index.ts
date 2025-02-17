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
    speed: 50,
    eta: 5,
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
    lat: 27.7195,
    lng: 85.3131,
    route: 'Gongabu to Jawalakhel',
    type: 'Standard Bus',
    speed: 35,
    eta: 12,
    occupancy: '25/50',
  },
  {
    id: 'bus6',
    lat: 27.7169,
    lng: 85.3625,
    route: 'Koteshwor to New Road',
    type: 'Electric Bus',
    speed: 40,
    eta: 8,
    occupancy: '35/45',
  },
  {
    id: 'bus7',
    lat: 27.6727,
    lng: 85.3199,
    route: 'Lagankhel to Basantapur',
    type: 'Diesel Bus',
    speed: 38,
    eta: 10,
    occupancy: '30/50',
  },
  {
    id: 'bus8',
    lat: 27.7093,
    lng: 85.3275,
    route: 'Sundhara to Swayambhu',
    type: 'Standard Bus',
    speed: 32,
    eta: 9,
    occupancy: '40/50',
  },
  {
    id: 'bus9',
    lat: 27.6842,
    lng: 85.2837,
    route: 'Kalanki to Satdobato',
    type: 'Electric Bus',
    speed: 48,
    eta: 6,
    occupancy: '25/40',
  },
  {
    id: 'bus10',
    lat: 27.6739,
    lng: 85.3256,
    route: 'Jawalakhel to Koteshwor',
    type: 'Standard Bus',
    speed: 34,
    eta: 14,
    occupancy: '28/50',
  },
  {
    id: 'bus11',
    lat: 27.7269,
    lng: 85.3422,
    route: 'Balaju to Bhaktapur',
    type: 'Diesel Bus',
    speed: 36,
    eta: 18,
    occupancy: '20/50',
  },
  {
    id: 'bus12',
    lat: 27.6955,
    lng: 85.3146,
    route: 'Kalanki to Balkot',
    type: 'Electric Bus',
    speed: 42,
    eta: 12,
    occupancy: '30/45',
  },
  {
    id: 'bus13',
    lat: 27.7078,
    lng: 85.3297,
    route: 'Ratnapark to Balaju',
    type: 'Standard Bus',
    speed: 28,
    eta: 5,
    occupancy: '15/40',
  },
  {
    id: 'bus14',
    lat: 27.6714,
    lng: 85.3375,
    route: 'Satdobato to Jawalakhel',
    type: 'Electric Bus',
    speed: 45,
    eta: 6,
    occupancy: '20/30',
  },
  {
    id: 'bus15',
    lat: 27.6928,
    lng: 85.3269,
    route: 'Kalimati to Sundhara',
    type: 'Diesel Bus',
    speed: 50,
    eta: 4,
    occupancy: '10/50',
  },
  {
    id: 'bus16',
    lat: 27.7123,
    lng: 85.3367,
    route: 'Maitighar to Baneshwor',
    type: 'Standard Bus',
    speed: 33,
    eta: 7,
    occupancy: '45/50',
  },
  {
    id: 'bus17',
    lat: 27.6719,
    lng: 85.3074,
    route: 'Lagankhel to Balkhu',
    type: 'Diesel Bus',
    speed: 38,
    eta: 10,
    occupancy: '30/50',
  },
  {
    id: 'bus18',
    lat: 27.7295,
    lng: 85.3145,
    route: 'Gongabu to Maharajgunj',
    type: 'Electric Bus',
    speed: 40,
    eta: 9,
    occupancy: '35/50',
  },
  {
    id: 'bus19',
    lat: 27.6832,
    lng: 85.3436,
    route: 'Basantapur to Bhaktapur',
    type: 'Standard Bus',
    speed: 29,
    eta: 20,
    occupancy: '28/50',
  },
  {
    id: 'bus20',
    lat: 27.6763,
    lng: 85.3152,
    route: 'Lagankhel to Kalanki',
    type: 'Diesel Bus',
    speed: 47,
    eta: 11,
    occupancy: '40/60',
  },
];

// Mock the `/api/buses` endpoint
adapter.onGet('/api/buses').reply(200, mockBuses);

export const fetchBuses = async (): Promise<Array<Bus>> => {
  const response = await mockApi.get('/api/buses');

  return response.data;
};
