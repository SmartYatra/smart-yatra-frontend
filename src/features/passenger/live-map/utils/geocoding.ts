import { api } from '@/lib/api-client';

export const fetchLocationName = async (lat: number, lng: number): Promise<string> => {
  try {
    const response = await api.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data: { display_name?: string } = response.data;
    return data.display_name || 'Unknown Location';
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown Location';
  }
};
