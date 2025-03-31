import { IonContent, IonPage } from '@ionic/react';
import { useLocation } from 'react-router';
import VerificationComp from '../components/VerificationComp';
import { useIonRouter } from '@ionic/react';

const VerificationPage: React.FC = () => {
  const location = useLocation<{ type: 'email' | 'whatsapp'; contact: string }>();
  const router = useIonRouter();

  const handleVerified = () => {
    router.push('/login', 'root');
  };

  return (
    <IonPage>
      <IonContent>
        <VerificationComp
          type={location.state?.type || 'email'}
          contact={location.state?.contact || ''}
          onVerified={handleVerified}
        />
      </IonContent>
    </IonPage>
  );
};

export default VerificationPage;