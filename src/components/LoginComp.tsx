import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setAuthenticated } from '../store/slices/authSlice';
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
import { USER_AUTH } from '../helpers/AuthConst';
import { setUser } from '../store/slices/userSlice';

const LoginComp: React.FC = () => {
  const [credentials, setCredentials] = useState({
    userId: '',
    password: ''
  });

  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const storeAuthToken = (userId: string) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const storageData = {
      userId,
      expiry: expiryDate.getTime(),
      token: 'your-auth-token' // Add proper token handling
    };

    localStorage.setItem(USER_AUTH, JSON.stringify(storageData));
  };


  const isValidPassword = (password: string) => {
    return password === '123456';
  };

  const setUsuario = () => {
    dispatch(setUser({
      id: '123',
      email: 'user@example.com',
      name: 'John',
      fullName: 'John Doe',
      premium: false,
      expert: false,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isValidPassword(credentials.password)) {
        storeAuthToken(credentials.userId);
        dispatch(setAuthenticated(true));
        // setUsuario();
        dispatch(setUser({
          id: '123',
          email: 'user@example.com',
          name: 'John',
          fullName: 'John Doe',
          premium: false,
          expert: false,
        }));
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
