import { useEffect, useState } from 'react';
import {
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent,
  IonToast,
  useIonRouter,
  IonList,
  IonItem,
  IonNote
} from '@ionic/react';
import { arrowBack, checkmarkCircle, refreshCircle } from 'ionicons/icons';

interface VerificationCompProps {
  type: 'email' | 'whatsapp' | 'ruc';
  contact: string;
  onVerified: () => void;
}

const VerificationComp: React.FC<VerificationCompProps> = ({ type, contact, onVerified }) => {
  const [code, setCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const router = useIonRouter();

  useEffect(() => {
    // Generate random 6-digit code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(newCode);
    
    // In a real app, you would send this code via email/WhatsApp/SMS based on the type
    console.log(`Verification code: ${newCode}`);

    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (code === verificationCode) {
      // Update verification status in localStorage
      const userData = JSON.parse(localStorage.getItem('USER_DATA') || '{}');
      userData[`${type}Verified`] = true;
      localStorage.setItem('USER_DATA', JSON.stringify(userData));

      setToastMessage('Verificación exitosa!');
      setShowToast(true);
      
      setTimeout(() => {
        onVerified();
      }, 2000);
    } else {
      setToastMessage('Código incorrecto. Intente nuevamente.');
      setShowToast(true);
    }
  };

  const handleResendCode = () => {
    // Generate new code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(newCode);
    
    // In a real app, you would send this code via email/WhatsApp/SMS based on the type
    console.log(`New verification code: ${newCode}`);
    
    // Reset timer
    setTimer(60);
    
    setToastMessage('Nuevo código enviado');
    setShowToast(true);
  };

  const getVerificationType = () => {
    switch(type) {
      case 'email':
        return 'Email';
      case 'whatsapp':
        return 'WhatsApp';
      case 'ruc':
        return 'RUC';
      default:
        return 'Cuenta';
    }
  }

  return (
    <div className="ion-padding">
      <IonButton fill="clear" onClick={() => router.goBack()}>
        <IonIcon slot="start" icon={arrowBack} />
        Volver
      </IonButton>

      <IonCard>
        <IonCardContent>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <IonText>
              <h2>Verificación de {getVerificationType()}</h2>
              <p>
                Hemos enviado un código de verificación {type === 'email' ? 'al correo' : type === 'whatsapp' ? 'al número' : 'asociado con el RUC'}:<br />
                <strong>{contact}</strong>
              </p>
            </IonText>
          </div>

          <IonList>
            <IonItem>
              <IonInput
                label="Código de verificación"
                labelPlacement="floating"
                type="number"
                value={code}
                onIonInput={e => setCode(e.detail.value || '')}
                maxlength={6}
              />
            </IonItem>
          </IonList>

          <div style={{ marginTop: '2rem' }}>
            <IonButton expand="block" onClick={handleVerify}>
              <IonIcon slot="start" icon={checkmarkCircle} />
              Verificar
            </IonButton>

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              {timer > 0 ? (
                <IonText color="medium">
                  Reenviar código en {timer} segundos
                </IonText>
              ) : (
                <IonButton fill="clear" onClick={handleResendCode}>
                  <IonIcon slot="start" icon={refreshCircle} />
                  Reenviar código
                </IonButton>
              )}
            </div>
          </div>
        </IonCardContent>
      </IonCard>

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

export default VerificationComp;