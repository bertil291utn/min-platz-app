import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  useIonRouter,
  IonToast,
  InputInputEventDetail,
  InputCustomEvent
} from '@ionic/react';

const LoginComp: React.FC = () => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });

  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();

  const storeAuthToken = (userId: string) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const storageData = {
      userId,
      expiry: expiryDate.getTime(),
      token: 'your-auth-token' // Add proper token handling
    };

    localStorage.setItem('userAuth', JSON.stringify(storageData));
  };


  const isValidPassword = (password: string) => {
    return password === '123456';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isValidPassword(credentials.password)) {
        storeAuthToken(credentials.userId);
        setIsAuthenticated(true);
      } else {
        setShowToast(true);
      }
    } catch (error) {
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };




  const handleChange = (e: InputCustomEvent<InputInputEventDetail>) => {
    const { value } = e.detail;
    const { name } = e.target as HTMLIonInputElement;

    setCredentials(prev => ({
      ...prev,
      [name]: value || ''
    }));
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '10px' }}>
      <IonToast
        position="top"
        positionAnchor="header"
        message="Contraseña o cedula incorrecta"
        duration={4000}
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}

      ></IonToast>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <IonInput
          labelPlacement='floating'
          fill='outline'
          label='Ingrese numero de cedula'
          type="number"
          name="userId"
          value={credentials.userId}
          onIonInput={(e) => handleChange(e)}
          required
        />
        <br />
        <IonInput
          labelPlacement='floating'
          fill='outline'
          label='Ingrese su contraseña'
          type="password"
          name="password"
          value={credentials.password}
          onIonInput={handleChange}
          required

        >
          <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
        </IonInput>

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Entrar'}
          </IonButton>
        </div>
      </form>
    </div>
  );
};

export default LoginComp;
