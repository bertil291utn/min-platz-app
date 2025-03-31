import React, { useState } from 'react';
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
  IonLabel
} from '@ionic/react';
import { arrowBack, chevronDown, chevronUp } from 'ionicons/icons';
import { USER_AUTH } from '../helpers/AuthConst';
import './RegisterComp.css';

interface RegisterForm {
  email: string;
  whatsapp: string;
  nombre: string;
  apellido: string;
  rucId: string;
  password: string;
  confirmPassword: string;
}

const RegisterComp: React.FC = () => {
  const [formData, setFormData] = useState<RegisterForm>({
    email: '',
    whatsapp: '',
    nombre: '',
    apellido: '',
    rucId: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
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

  const validateForm = () => {
    const newErrors: Partial<RegisterForm> = {};

    // Mandatory fields validation
    if (!formData.whatsapp) {
      newErrors.whatsapp = 'El número de WhatsApp es requerido';
    } else if (!/^\d{10}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Número de WhatsApp inválido';
    } else {
      const existingUsers = JSON.parse(localStorage.getItem('USER_DATA') || '[]');
      if (Array.isArray(existingUsers)) {
        const whatsappExists = existingUsers.some(user => user.whatsapp === formData.whatsapp);
        if (whatsappExists) {
          newErrors.whatsapp = 'Este número de WhatsApp ya está registrado';
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
        whatsapp: formData.whatsapp,
        nombre: formData.nombre,
        apellido: formData.apellido,
        password:formData.password,
        rucId: formData.rucId || null,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('USER_DATA', JSON.stringify(userData));
      router.push('/verify', 'forward');
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
                label="WhatsApp *"
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
                  label="RUC ID"
                  labelPlacement="floating"
                  type="text"
                  name="rucId"
                  value={formData.rucId}
                  onIonInput={handleChange}
                />
              </IonItem>
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