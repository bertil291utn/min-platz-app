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
import { USER_AUTH, USER_DATA } from '../helpers/AuthConst';
import { setUser } from '../store/slices/userSlice';
import { isValidIdentification } from '../helpers/cedulaHelper';
import bcrypt from 'bcryptjs';
import { getUserByCi, formatUserForRedux } from '../services/userService';

const INITIAL_FORM_DATA = {
  ci: '',
  password: ''
}

const LoginComp: React.FC = () => {
  const [credentials, setCredentials] = useState(INITIAL_FORM_DATA);

  const router = useIonRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const storeAuthToken = (ci: string) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const storageData = {
      ci,
      expiry: expiryDate.getTime(),
      token: 'your-auth-token'
    };

    localStorage.setItem(USER_AUTH, JSON.stringify(storageData));
  };

  const validateUser = async (ci: string, password: string) => {
    if (!isValidIdentification(ci)) {
      throw new Error('Cédula inválida');
    }

    const userData = await getUserByCi(ci);
    if (!userData) {
      throw new Error('Usuario no registrado');
    }

    // Compare password with hashed password using bcrypt
    const isValidPassword = await bcrypt.compare(password, userData.password);
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta');
    }

    return userData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await validateUser(credentials.ci, credentials.password);

      // Store auth token
      storeAuthToken(credentials.ci);

      // Set authentication state
      dispatch(setAuthenticated(true));

      // Set user data
      dispatch(setUser(formatUserForRedux(userData)));

      router.push('/home')
      setCredentials(INITIAL_FORM_DATA)

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
            label='Ingrese su Cédula'
            type="number"
            name="ci"
            value={credentials.ci}
            onIonInput={handleChange}
            maxlength={10}
            required
            placeholder="Ej: 1234567890"
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

          <IonButton expand="block" type="submit" disabled={isLoading}>
            {isLoading ? 'Procesando...' : 'Entrar'}
          </IonButton>

        </form>
        <div className="ion-padding-top">
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
      </div>
    </div>
  );
};

export default LoginComp;
