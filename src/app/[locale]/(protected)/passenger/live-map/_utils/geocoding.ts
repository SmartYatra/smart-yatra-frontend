import axios from 'axios';

export const fetchLocationName = async (
  lat: number,
  lng: number
): Promise<string> => {
  try {
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    const data = response.data;
    return (
      data.locality ||
      data.city ||
      data.principalSubdivision ||
      'Unknown Location'
    );
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown Location';
  }
};
