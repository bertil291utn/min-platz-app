import { IonItem, IonLabel, IonToggle } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { EXPERT_USER } from '../helpers/AuthConst';

const TipoUserSettingsC = () => {
  const { expertUser, setExpertUser } = useAuth();

  const handleToggleChange = (e: CustomEvent) => {
    const newValue = e.detail.checked;
    setExpertUser(newValue);
    localStorage.setItem(EXPERT_USER, JSON.stringify(newValue));
  };

  return (
    <>
      <IonItem>
        <IonLabel>{expertUser ? 'Desactivar de' : 'Activar a'}  usuario experto</IonLabel>
        <IonToggle
          checked={expertUser}
          onIonChange={handleToggleChange}
          slot="end"
        />
      </IonItem>
    </>
  );
}

export default TipoUserSettingsC;