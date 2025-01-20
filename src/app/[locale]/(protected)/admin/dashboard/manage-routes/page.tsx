import React, { Suspense } from 'react';

import ManageRoutes from '../_components/manage-routes';

export default function page() {
  return (
    <Suspense>
      <ManageRoutes />
    </Suspense>
  );
}
