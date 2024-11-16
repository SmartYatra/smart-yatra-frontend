import { Route } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { AdminHome } from '@/features/admin';
import { DriverHome } from '@/features/driver';
import Home from '@/features/home';
import PassengerLayout from '@/features/passenger';
import {
  AddFunds,
  LiveMap,
  PastTrips,
  TransactionHistory,
  UpcomingTrips,
} from '@/features/passenger/pages';

/**
 * UnAuth routes are used to define the unauth routes.
 */
const UnAuthRoutes = () => (
  <>
    {/* Unprotected Routes */}
    <Route index element={<Home />} path={ROUTES.HOME} />

    {/* Passenger Routes */}
    <Route element={<PassengerLayout />}>
      <Route element={<LiveMap />} path={ROUTES.PASSENGER.HOME} />
      <Route element={<LiveMap />} path={ROUTES.PASSENGER.LIVE_MAP} />
      <Route element={<PastTrips />} path={ROUTES.PASSENGER.PAST_TRIPS} />
      <Route element={<UpcomingTrips />} path={ROUTES.PASSENGER.UPCOMING_TRIPS} />
      <Route element={<TransactionHistory />} path={ROUTES.PASSENGER.TRANSACTION_HISTORY} />
      <Route element={<AddFunds />} path={ROUTES.PASSENGER.ADD_FUNDS} />
    </Route>

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
