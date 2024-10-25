export const ROUTES = {
  HOME: '/',

  AUTH: {
    ROOT: '/auth',
    SIGN_IN: 'signin',
    SIGN_UP: 'signup',
    FORGOT_PASSWORD: 'forgot-password',
  },
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
  FORGOT_PASSWORD: '/auth/forgot-password',

  // Passenger Routes
  PASSENGER_HOME: '/passenger',
  PASSENGER_TRIPS: '/passenger/trips',
  PASSENGER_FAVORITES: '/passenger/favorites',
  PASSENGER_PROFILE: '/passenger/profile',
  PASSENGER_PAYMENTS: '/passenger/payments',

  // Driver Routes
  DRIVER_HOME: '/driver',
  DRIVER_TRIPS: '/driver/trips',
  DRIVER_PROFILE: '/driver/profile',
  DRIVER_EARNINGS: '/driver/earnings',
  DRIVER_SETTINGS: '/driver/settings',

  // Admin Routes
  ADMIN_HOME: '/admin',
  ADMIN_USER_MANAGEMENT: '/admin/users',
  ADMIN_TRIP_MANAGEMENT: '/admin/trips',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_SETTINGS: '/admin/settings',
};
