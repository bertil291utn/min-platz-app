import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonInput,
  IonButton,
  IonInputPasswordToggle,
  useIonRouter,
  IonToast,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonNote,
  InputCustomEvent,
  InputInputEventDetail,
  IonLabel,
  IonSpinner,
  IonPopover,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { arrowBack, chevronDown, chevronUp, informationCircle } from 'ionicons/icons';
import { USER_AUTH, USER_DATA } from '../helpers/AuthConst';
import './RegisterComp.css';
import { fetchPersonInfo } from '../services/PersonService';
import { isValidIdentification } from '../helpers/cedulaHelper';

interface RegisterForm {
  email: string;
  whatsapp: string;
  nombre: string;
  apellido: string;
  ci: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM_DATA = {
  email: '',
  whatsapp: '',
  nombre: '',
  apellido: '',
  ci: '',
  password: '',
  confirmPassword: ''
}

const RegisterComp: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>(INITIAL_FORM_DATA);

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [fetchingCiInfo, setFetchingCiInfo] = useState(false);
  const router = useIonRouter();

  const handleChange = (e: InputCustomEvent<InputInputEventDetail>) => {
    const { name, value } = e.target as HTMLIonInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: value || ''
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    // Check confirm password match when password or confirmPassword changes
    if (name === 'password' || name === 'confirmPassword') {
      const confirmValue = name === 'confirmPassword' ? value : formData.confirmPassword;
      const passwordValue = name === 'password' ? value : formData.password;

      if (confirmValue && passwordValue !== confirmValue) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Las contraseñas no coinciden'
        }));
      } else if (confirmValue) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: ''
        }));
      }
    }
  };

  const validatePasswordOnBlur = () => {
    if (!formData.password) {
      setErrors(prev => ({
        ...prev,
        password: 'La contraseña es requerida'
      }));
      return;
    }

    if (!validatePassword(formData.password)) {
      setErrors(prev => ({
        ...prev,
        password: 'La contraseña no cumple con los requisitos'
      }));
    }
  };

  const validateConfirmPasswordOnBlur = () => {
    if (!formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Confirmar contraseña es requerido'
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: 'Las contraseñas no coinciden'
      }));
    }
  };

  const fetchCiData = async () => {
    if (!formData.ci) {
      return;
    }

    if (!isValidIdentification(formData.ci)) {
      setErrors(prev => ({
        ...prev,
        ci: 'Cédula inválida'
      }));
      return;
    }
    const existingUser = JSON.parse(localStorage.getItem(USER_DATA) as string);
    if (existingUser) {
      const ciExists = existingUser.ci === formData.ci;
      if (ciExists) {
        setErrors(prev => ({
          ...prev,
          ci: 'Esta cédula ya está registrada'
        }));
        return;
      }
    }

    setFetchingCiInfo(true);
    try {
      const personInfo = await fetchPersonInfo(formData.ci);

      if (personInfo) {
        setFormData(prev => ({
          ...prev,
          nombre: personInfo.firstName,
          apellido: personInfo.lastName
        }));
      }
      // Silently fail if no data is found - let user fill in manually
    } catch (error) {
      // Silently fail if there's an error - let user fill in manually
      console.error('Error fetching CI info:', error);
    } finally {
      setFetchingCiInfo(false);
    }
  };

  const validatePassword = (password: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const endsWithAt = password.endsWith('@');
    const hasMinLength = password.length >= 6;

    return hasUpperCase && hasLowerCase && hasNumbers && endsWithAt && hasMinLength;
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterForm> = {};

    // Mandatory fields validation
    if (!formData.ci) {
      newErrors.ci = 'La cédula es requerida';
    } else if (!isValidIdentification(formData.ci)) {
      newErrors.ci = 'Cédula inválida';
    } else {
      const existingUser = JSON.parse(localStorage.getItem(USER_DATA) as string);
      if (existingUser) {
        const ciExists = existingUser.ci === formData.ci;
        if (ciExists) {
          newErrors.ci = 'Esta cédula ya está registrada';
        }
      }
    }

    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.apellido) {
      newErrors.apellido = 'El apellido es requerido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña no cumple con los requisitos';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmar contraseña es requerido';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Optional fields validation (only if they have content)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.whatsapp && !/^\d{10}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Número de WhatsApp inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userData = {
        email: formData.email,
        whatsapp: formData.whatsapp || null,
        nombre: formData.nombre,
        apellido: formData.apellido,
        password: formData.password,
        ci: formData.ci,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(USER_DATA, JSON.stringify(userData));
      setFormData(INITIAL_FORM_DATA);

      // Show success message
      setToastMessage('Usuario registrado exitosamente');
      setShowToast(true);

      // Wait for toast to be visible before redirecting
      router.push('/login', 'root');
    } catch (error) {
      setToastMessage('Error al registrar');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ion-padding register-component">
      <div style={{ marginBottom: '2rem' }}>
        <IonButton fill="clear" onClick={() => router.push('/login', 'root')}>
          <IonIcon slot="start" icon={arrowBack} />
          Volver a login
        </IonButton>
      </div>

      <form onSubmit={handleSubmit}>
        <IonList>
          {/* Mandatory Fields */}
          <div className="mandatory-fields">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IonText color="medium">
                <h2>Campos Obligatorios</h2>
              </IonText>
              <IonButton
                fill="clear"
                id="password-info"
                size="small"
                style={{ height: '25px', margin: 0, padding: 0 }}
              >
                <IonIcon icon={informationCircle} color="medium" />
              </IonButton>
              <IonPopover trigger="password-info" triggerAction="click">
                <div className="ion-padding">
                  <h3 style={{ margin: '0 0 8px 0' }}>Requisitos de contraseña:</h3>
                  <ul style={{ margin: 0, paddingInlineStart: '20px' }}>
                    <li>Mínimo 6 caracteres</li>
                    <li>Al menos una letra mayúscula</li>
                    <li>Al menos una letra minúscula</li>
                    <li>Al menos un número</li>
                    <li>Debe terminar con @</li>
                  </ul>
                </div>
              </IonPopover>
            </div>

            <IonItem>
              <IonInput
                label="Cédula *"
                labelPlacement="floating"
                type="number"
                name="ci"
                value={formData.ci}
                onIonInput={handleChange}
                onIonBlur={fetchCiData}
                errorText={errors.ci}
                maxlength={10}
                required
              />
              {fetchingCiInfo && (
                <IonSpinner name="crescent" slot="end" />
              )}
            </IonItem>
            {errors.ci && (
              <IonNote color="danger" className="ion-padding-start">
                {errors.ci}
              </IonNote>
            )}

            <IonItem>
              <IonInput
                label="Nombres *"
                labelPlacement="floating"
                type="text"
                name="nombre"
                value={formData.nombre}
                onIonInput={handleChange}
                errorText={errors.nombre}
                required
              />
            </IonItem>
            {errors.nombre && (
              <IonNote color="danger" className="ion-padding-start">
                {errors.nombre}
              </IonNote>
            )}

            <IonItem>
              <IonInput
                label="Apellidos *"
                labelPlacement="floating"
                type="text"
                name="apellido"
                value={formData.apellido}
                onIonInput={handleChange}
                errorText={errors.apellido}
                required
              />
            </IonItem>
            {errors.apellido && (
              <IonNote color="danger" className="ion-padding-start">
                {errors.apellido}
              </IonNote>
            )}

            <IonItem style={{ width: '100%' }}>
              <IonInput
                label="Contraseña *"
                labelPlacement="floating"
                type="password"
                name="password"
                value={formData.password}
                onIonInput={handleChange}
                onIonBlur={validatePasswordOnBlur}
                errorText={errors.password}
                required
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
            {errors.password && (
              <IonNote color="danger" className="ion-padding-start">
                {errors.password}
              </IonNote>
            )}

            <IonItem>
              <IonInput
                label="Confirmar Contraseña *"
                labelPlacement="floating"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onIonInput={handleChange}
                onIonBlur={validateConfirmPasswordOnBlur}
                errorText={errors.confirmPassword}
                required
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
            {errors.confirmPassword && (
              <IonNote color="danger" className="ion-padding-start">
                {errors.confirmPassword}
              </IonNote>
            )}
          </div>

          {/* Optional Fields Toggle Button */}
          <div className="ion-padding-vertical">
            <IonButton
              fill="clear"
              expand="block"
              onClick={() => setShowOptionalFields(!showOptionalFields)}
            >
              <IonIcon slot="end" icon={showOptionalFields ? chevronUp : chevronDown} />
              {showOptionalFields ? 'Ocultar campos opcionales' : 'Mostrar campos opcionales'}
            </IonButton>
          </div>

          {/* Optional Fields */}
          {showOptionalFields && (
            <div className="optional-fields">
              <IonText color="medium">
                <h2>Campos Opcionales</h2>
              </IonText>

              <IonItem>
                <IonInput
                  label="Email"
                  labelPlacement="floating"
                  type="email"
                  name="email"
                  value={formData.email}
                  onIonInput={handleChange}
                  errorText={errors.email}
                />
              </IonItem>
              {errors.email && (
                <IonNote color="danger" className="ion-padding-start">
                  {errors.email}
                </IonNote>
              )}

              <IonItem>
                <IonInput
                  label="WhatsApp"
                  labelPlacement="floating"
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onIonInput={handleChange}
                  errorText={errors.whatsapp}
                />
              </IonItem>
              {errors.whatsapp && (
                <IonNote color="danger" className="ion-padding-start">
                  {errors.whatsapp}
                </IonNote>
              )}
            </div>
          )}
        </IonList>

        <div className="ion-padding-top">
          <IonButton expand="block" type="submit" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </IonButton>
        </div>
      </form>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        onDidDismiss={() => setShowToast(false)}
        position="top"
      />
    </div>
  );
};

export default RegisterComp;