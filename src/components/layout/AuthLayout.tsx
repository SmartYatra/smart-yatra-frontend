import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <div className="absolute top-0 -z-50 h-1/2 w-full bg-gray-50" />
      <div className="absolute bottom-0 -z-50 h-1/2 w-full bg-gray-100" />

      <Outlet />
    </>
  );
};

export default AuthLayout;
