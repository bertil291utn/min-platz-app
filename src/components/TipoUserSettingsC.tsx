import { IonItem, IonLabel, IonToggle } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setExpertUser } from '../store/slices/authSlice';

const TipoUserSettingsC = () => {
  const expertUser = useAppSelector(state => state.auth.expertUser);
  const dispatch = useAppDispatch();

  const handleToggleChange = (e: CustomEvent) => {
    const newValue = e.detail.checked;
    dispatch(setExpertUser(newValue));
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
