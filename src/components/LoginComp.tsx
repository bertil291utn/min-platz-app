import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setAuthenticated } from '../store/slices/authSlice';
import {
  IonInput,
  IonButton,
  useIonRouter,
  IonToast,
  InputInputEventDetail,
  InputCustomEvent,
  IonText,
  IonInputPasswordToggle
} from '@ionic/react';
import { USER_AUTH } from '../helpers/AuthConst';
import { setUser } from '../store/slices/userSlice';

const LoginComp: React.FC = () => {
  const [credentials, setCredentials] = useState({
    whatsapp: '',
    password: ''
  });

  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const storeAuthToken = (whatsapp: string) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const storageData = {
      whatsapp,
      expiry: expiryDate.getTime(),
      token: 'your-auth-token'
    };

    localStorage.setItem(USER_AUTH, JSON.stringify(storageData));
  };

  const validateUser = (whatsapp: string, password: string) => {
    const userData = localStorage.getItem('USER_DATA');
    if (!userData) {
      throw new Error('Usuario no registrado');
    }
    
    const user = JSON.parse(userData);
    console.log(user)
    if (user.whatsapp !== whatsapp) {
      throw new Error('WhatsApp no encontrado');
    }

    // In a real app, you would hash the password before comparing
    if (user.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = validateUser(credentials.whatsapp, credentials.password);

      // Store auth token
      storeAuthToken(credentials.whatsapp);

      // Set authentication state
      dispatch(setAuthenticated(true));

      // Set user data
      dispatch(setUser({
        id: user.whatsapp,
        email: user.email,
        name: user.nombre,
        lastName: user.apellido,
        whatsapp: user.whatsapp,
        rucId: user.rucId,
        premium: user.premium || false,
        expert: user.expert || false
      }));

    } catch (error) {
      setToastMessage(error instanceof Error ? error.message : 'Error al iniciar sesión');
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
    <div className="login-component" style={{ display: 'flex', alignItems: 'center', height: '100%', padding: '10px' }}>
      <IonToast
        position="top"
        positionAnchor="header"
        message={toastMessage}
        duration={4000}
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
      />

      <div style={{ width: '100%' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <IonInput
            labelPlacement='floating'
            fill='outline'
            label='Ingrese su WhatsApp'
            type="tel"
            name="whatsapp"
            value={credentials.whatsapp}
            onIonInput={handleChange}
            required
            placeholder="Ej: 999999999"
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

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <IonText color="medium">
                ¿No tienes una cuenta?
              </IonText>
              <IonButton
                fill="clear"
                expand="block"
                onClick={() => router.push('/register', 'forward')}
              >
                Registrarse
              </IonButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComp;
