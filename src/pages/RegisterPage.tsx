import { IonContent, IonPage } from '@ionic/react';
import RegisterComp from '../components/RegisterComp';

const RegisterPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <RegisterComp />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;