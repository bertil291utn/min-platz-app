import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { useAppSelector } from '../store/hooks';

// Import pages
import Home from '../pages/Home';
import LoginPages from '../pages/LoginPages';
import RegisterPage from '../pages/RegisterPage';
import TabFacturacion from '../pages/TabFacturacion';
import TabNotasEnvio from '../pages/TabNotasEnvio';
import TabMonitoreo from '../pages/TabMonitoreo';
import TabFacturaCompra from '../pages/TabFacturaCompra';
import TabSettings from '../pages/TabSettings';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <IonRouterOutlet id="main">
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/login">
        <LoginPages />
      </Route>
      <Route exact path="/">
        <Redirect to={isAuthenticated ? "/monitoreo" : "/login"} />
      </Route>
      <Route exact path="/facturacion">
        {isAuthenticated ? <TabFacturacion /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/notas-envio">
        {isAuthenticated ? <TabNotasEnvio /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/monitoreo">
        {isAuthenticated ? <TabMonitoreo /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/factura-compra">
        {isAuthenticated ? <TabFacturaCompra /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/settings">
        {isAuthenticated ? <TabSettings /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/register">
        <RegisterPage />
      </Route>
    </IonRouterOutlet>
  );
};

export default AppRoutes; 