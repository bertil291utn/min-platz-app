import { IonItem, IonLabel, IonToggle } from '@ionic/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUser } from '../store/slices/userSlice';
import { User } from '../interfaces/User';
import { useEffect } from 'react';

const TipoUserSettingsC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userLogged.user);

  const handleToggleChange = (e: CustomEvent) => {
    const newValue = e.detail.checked;
    const name = (e.target as HTMLIonToggleElement)?.name;
    dispatch(updateUser({ [name]: newValue }));
  };

  return (
    <>
      <IonItem>
        <IonLabel>{user?.expert ? 'Desactivar de' : 'Activar a'}  usuario experto</IonLabel>
        <IonToggle
          name='expert'
          checked={user?.expert}
          onIonChange={handleToggleChange}
          slot="end"
        />
      </IonItem>
      {/* remove this component just for test, this value hs to coming from database and set in main component */}
      <IonItem>
        <IonLabel>Usuario premium</IonLabel>
        <IonToggle
          name='premium'
          checked={user?.premium}
          onIonChange={handleToggleChange}
          slot="end"
        />
      </IonItem>
    </>
  );
}

export default TipoUserSettingsC;
