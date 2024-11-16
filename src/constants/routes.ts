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

  // Landing Page
  FEATURES: '/#features',
  ABOUT: '/#about',
  CONTACT: '/#contact',

  // Passenger Routes
  PASSENGER: {
    HOME: '/passenger',
    LIVE_MAP: '/passenger/live-map',
    MY_TRIPS: '/passenger/my-trips',
    PAST_TRIPS: '/passenger/my-trips/past',
    UPCOMING_TRIPS: '/passenger/my-trips/upcoming',
    TRANSACTION_HISTORY: '/passenger/payments',
    ADD_FUNDS: '/passenger/payments/add-funds',
    HELP_CENTER: '/passenger/support/help-center',
    CONTACT_US: '/passenger/support/contact',
  },

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
