import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const coords = searchParams.get('coords'); // expects "lng,lat;lng,lat;..."

  if (!coords) {
    return NextResponse.json(
      { error: 'Missing coords parameter' },
      { status: 400 }
    );
  }

  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

  try {
    const { data } = await axios.get(url);
    return NextResponse.json(data);
  } catch (error) {
    console.error('OSRM proxy error:', error);
    return NextResponse.json(
      { error: 'Error fetching route' },
      { status: 500 }
    );
  }
}
