import { nextApi } from '@/lib/api-client';

type IStops = Array<{
  location_lat: string;
  location_lng: string;
}>;

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

export const getRoadPath = async (stops: IStops): Promise<ICoordinate[]> => {
  if (stops.length < 2) return [];

  const coordinates = stops
    .map(
      stop =>
        `${parseFloat(stop.location_lng)},${parseFloat(stop.location_lat)}`
    )
    .join(';');

  try {
    const response = await nextApi.get(
      `/api/route-path?coords=${encodeURIComponent(coordinates)}`
    );
    const data: IRouteResponse = response.data;

    if (!data.features || data.features.length === 0) {
      console.error('No route found for coordinates:', coordinates);
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
