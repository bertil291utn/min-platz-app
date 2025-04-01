import { IonContent, IonPage } from '@ionic/react';
import { useLocation } from 'react-router';
import VerificationComp from '../components/VerificationComp';
import { useIonRouter } from '@ionic/react';
import { useEffect, useState } from 'react';

interface VerificationData {
  type: 'email' | 'whatsapp' | 'ruc';
  contact: string;
}

const VerificationPage: React.FC = () => {
  const [verificationData, setVerificationData] = useState<VerificationData>({
    type: 'ruc',
    contact: ''
  });
  const router = useIonRouter();

  useEffect(() => {
    // Get verification data from sessionStorage
    const storedData = sessionStorage.getItem('verification');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setVerificationData({
          type: parsedData.type || 'ruc',
          contact: parsedData.contact || ''
        });
        // Clean up after reading
        sessionStorage.removeItem('verification');
      } catch (error) {
        console.error('Error parsing verification data:', error);
      }
    }
  }, []);

  const handleVerified = () => {
    router.push('/login', 'root');
  };

  return (
    <IonPage>
      <IonContent>
        <VerificationComp
          type={verificationData.type}
          contact={verificationData.contact}
          onVerified={handleVerified}
        />
      </IonContent>
    </IonPage>
  );
};

export default VerificationPage;