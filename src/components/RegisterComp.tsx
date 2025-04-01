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
  IonSpinner
} from '@ionic/react';
import { arrowBack, chevronDown, chevronUp } from 'ionicons/icons';
import { USER_AUTH } from '../helpers/AuthConst';
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

    setFetchingCiInfo(true);
    try {
      const personInfo = await fetchPersonInfo(formData.ci);

      if (personInfo) {
        setFormData(prev => ({
          ...prev,
          nombre: personInfo.firstName,
          apellido: personInfo.lastName
        }));
        // setToastMessage('Información obtenida correctamente');
        // setShowToast(true);
      }
      // Silently fail if no data is found - let user fill in manually
    } catch (error) {
      // Silently fail if there's an error - let user fill in manually
      console.error('Error fetching CI info:', error);
    } finally {
      setFetchingCiInfo(false);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<RegisterForm> = {};

    // Mandatory fields validation
    if (!formData.ci) {
      newErrors.ci = 'La cédula es requerida';
    } else if (!isValidIdentification(formData.ci)) {
      newErrors.ci = 'Cédula inválida';
    } else {
      const existingUsers = JSON.parse(localStorage.getItem('USER_DATA') || '[]');
      if (Array.isArray(existingUsers)) {
        const ciExists = existingUsers.some(user => user.ci === formData.ci);
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

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
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

      localStorage.setItem('USER_DATA', JSON.stringify(userData));
      setFormData(INITIAL_FORM_DATA)
      // Push to verification page with CI information
      router.push('/verify');

      // Set the state data in sessionStorage since IonRouter doesn't support state transfer directly
      sessionStorage.setItem('verification', JSON.stringify({
        type: 'ci',
        contact: formData.ci
      }));
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
            <IonText color="medium">
              <h2>Campos Obligatorios</h2>
            </IonText>

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
                label="Nombre *"
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
                label="Apellido *"
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

            <IonItem>
              <IonInput
                label="Contraseña *"
                labelPlacement="floating"
                type="password"
                name="password"
                value={formData.password}
                onIonInput={handleChange}
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