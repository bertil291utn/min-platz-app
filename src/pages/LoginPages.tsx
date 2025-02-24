import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import LoginComp from '../components/LoginComp';

const LoginPages: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <LoginComp />
      </IonContent>
    </IonPage>
  );
};

export default LoginPages;
