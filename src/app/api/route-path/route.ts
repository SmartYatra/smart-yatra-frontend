import { NextResponse } from 'next/server';

import axios from 'axios';

const ORS_API_KEY = process.env.ORS_API_KEY; // Store this in .env.local

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coords = searchParams.get('coords'); // Expecting "lng1,lat1;lng2,lat2;..."

  if (!coords) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  try {
    const url =
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson';
    const response = await axios.post(
      url,
      {
        coordinates: coords.split(';').map(pair => pair.split(',').map(Number)),
        options: { avoid_features: ['highways', 'tollways'] }, // Avoid unnecessary detours
      },
      {
        headers: {
          Authorization: `Bearer ${ORS_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('ORS Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch route' },
      { status: 500 }
    );
  }
}
