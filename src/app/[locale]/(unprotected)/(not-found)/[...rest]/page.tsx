import { notFound } from 'next/navigation';

/**
 * CatchAllPage Component
 * This component catches all undefined routes and triggers a 404 error.
 */
export default function CatchAllPage() {
  // This triggers the 404 page
  notFound();
}
