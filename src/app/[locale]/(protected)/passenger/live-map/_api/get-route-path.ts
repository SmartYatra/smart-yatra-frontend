import { nextApi } from '@/lib/api-client';

interface IRouteResponse {
  features: Array<{
    geometry: {
      coordinates: Array<[number, number]>;
    };
  }>;
}

interface ICoordinate {
  lat: number;
  lng: number;
}

export const getRoadPath = async (
  coordinates: ICoordinate[]
): Promise<ICoordinate[]> => {
  if (coordinates.length < 2) return [];

  const coordsString = coordinates
    .map(coord => `${coord.lng},${coord.lat}`)
    .join(';');

  try {
    const response = await nextApi.get(
      `/api/route-path?coords=${encodeURIComponent(coordsString)}`
    );
    const data: IRouteResponse = response.data;

    if (!data.features || data.features.length === 0) {
      console.error('No route found for coordinates:', coordsString);
      return [];
    }

    return data.features[0].geometry.coordinates.map(coord => ({
      lat: coord[1],
      lng: coord[0],
    }));
  } catch (error) {
    console.error('Error fetching route:', error);
    return [];
  }
};
