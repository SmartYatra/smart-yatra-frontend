import { Outlet } from 'react-router-dom';

import MainProvider from '@/app/main-provider';
import ScrollToTop from '@/components/ScrollToTop';

/**
 * App component is the entry point for the application.
 */
const App = () => {
  return (
    <MainProvider>
      <Outlet />
      <ScrollToTop />
    </MainProvider>
  );
};

export default App;
