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
import TabPronosticos from '../pages/TabPronosticos';
import TabFumigacion from '../pages/TabFumigacion';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <IonRouterOutlet id="main">
      {/* Public routes - only accessible when NOT authenticated */}
      <Route exact path="/login">
        {!isAuthenticated ? <LoginPages /> : <Redirect to="/home" />}
      </Route>
      <Route exact path="/register">
        {!isAuthenticated ? <RegisterPage /> : <Redirect to="/home" />}
      </Route>

      {/* Protected routes - only accessible when authenticated */}
      <Route exact path="/home">
        {isAuthenticated ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/">
        <Redirect to={isAuthenticated ? "/home" : "/login"} />
      </Route>
      <Route exact path="/facturacion">
        {isAuthenticated ? <TabFacturacion /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/notas-envio">
        {isAuthenticated ? <TabNotasEnvio /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/monitoreo">
        <Redirect to="/monitoreo/nuevo" />
      </Route>
      <Route exact path="/monitoreo/nuevo">
        {isAuthenticated ? <TabMonitoreo initialSegment="monitorear" /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/monitoreo/ver">
        {isAuthenticated ? <TabMonitoreo initialSegment="historial" /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/factura-compra">
        {isAuthenticated ? <TabFacturaCompra /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/settings">
        {isAuthenticated ? <TabSettings /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/pronosticos">
        {isAuthenticated ? <TabPronosticos /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/fumigacion">
        {isAuthenticated ? <TabFumigacion /> : <Redirect to="/login" />}
      </Route>
    </IonRouterOutlet>
  );
};

export default AppRoutes; 