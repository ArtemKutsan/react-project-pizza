import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from '../../../shared/ui/PageLoader';
import { routeConfig } from '../../../shared/config/routerConfig';

const AppRouter = () => {
  const renderWithWrapper = (route) => {
    const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>;
    return <Route key={route.path} path={route.path} element={element} />;
  };

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
