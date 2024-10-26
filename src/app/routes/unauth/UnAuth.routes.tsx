import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AdminHome } from '@/features/admin';
import { DriverHome } from '@/features/driver';
import Home from '@/features/home';
import { PassengerHome } from '@/features/passenger';

/**
 * UnAuth routes are used to define the unauth routes.
 */
const UnAuthRoutes = () => (
  <>
    {/* Unprotected Routes */}
    <Route element={<Home />} path={ROUTES.HOME} />

    {/* Passenger Routes */}
    <Route element={<PassengerHome />} path={ROUTES.PASSENGER_HOME} />
    {/* <Route element={<PassengerTrips />} path={ROUTES.PASSENGER_TRIPS} />
    <Route element={<PassengerFavorites />} path={ROUTES.PASSENGER_FAVORITES} />
    <Route element={<PassengerProfile />} path={ROUTES.PASSENGER_PROFILE} />
    <Route element={<PassengerPayments />} path={ROUTES.PASSENGER_PAYMENTS} /> */}

    {/* Driver Routes */}
    <Route element={<DriverHome />} path={ROUTES.DRIVER_HOME} />
    {/* <Route element={<DriverTrips />} path={ROUTES.DRIVER_TRIPS} />
    <Route element={<DriverProfile />} path={ROUTES.DRIVER_PROFILE} />
    <Route element={<DriverEarnings />} path={ROUTES.DRIVER_EARNINGS} />
    <Route element={<DriverSettings />} path={ROUTES.DRIVER_SETTINGS} /> */}

    {/* Admin Routes */}
    <Route element={<AdminHome />} path={ROUTES.ADMIN_HOME} />
    {/* <Route element={<AdminUserManagement />} path={ROUTES.ADMIN_USER_MANAGEMENT} />
    <Route element={<AdminTripManagement />} path={ROUTES.ADMIN_TRIP_MANAGEMENT} />
    <Route element={<AdminReports />} path={ROUTES.ADMIN_REPORTS} />
    <Route element={<AdminSettings />} path={ROUTES.ADMIN_SETTINGS} /> */}
  </>
);

export default UnAuthRoutes;
