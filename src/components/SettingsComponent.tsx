import {
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton,
  IonIcon, IonList, IonNote, IonAvatar, IonChip,
} from '@ionic/react';
import { logOutOutline, personCircleOutline, mailOutline, callOutline, cardOutline, settingsOutline, sparkles } from 'ionicons/icons';
import BloquesSettingsC from './BloquesSettingsC';
import { useEffect, useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { NUMERO_CAMAS_MIN } from '../helpers/bloquesConstant';
import ArchivedBloquesSettingsC from './ArchivedBloquesSettingsC';
import { Bloque } from '../interfaces/Bloque';
import UserProfileC from './UserProfileC';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addBloque, INITIAL_BLOQUE, selectActiveBloques } from '../store/slices/bloqueInfoSlice';
import { cleanUser } from '../store/slices/userSlice';
import { setAuthenticated } from '../store/slices/authSlice';
import { useIonRouter } from '@ionic/react';
import './SettingsComponent.css';

const SettingsC = () => {
  const activeBloques = useAppSelector(selectActiveBloques);
  const bloques = useAppSelector(state => state.bloqueInfo.bloques);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bloqueForm, setBloqueForm] = useState<Bloque>(INITIAL_BLOQUE);
  const dispatch = useAppDispatch();
  const router = useIonRouter();

  useEffect(() => {
    setBloqueForm(prev => ({
      ...prev,
      name: `Bloque ${bloques.length + 1}`,
      numCamas: NUMERO_CAMAS_MIN,
      numPlacasExternas: NUMERO_CAMAS_MIN,
      numPlacasInternas: NUMERO_CAMAS_MIN
    }));
  }, [isOpenModal]);

  const handleConfirm = () => {
    dispatch(addBloque(bloqueForm));
    setIsOpenModal(false);
    setBloqueForm(INITIAL_BLOQUE);
  };

  const handleLogout = () => {
    dispatch(cleanUser());
    dispatch(setAuthenticated(false));
    router.push('/login');
  };

  const IsThereActiveBloques = activeBloques.length > 0;

  return (
    <div>
      <IonAccordionGroup>
        <UserProfileC />

        <IonAccordion value="planes">
          <IonItem slot="header" color="light">
            <IonIcon icon={sparkles} slot="start" style={{ color: 'var(--ion-color-warning)' }} />
            <IonLabel>Planes y Precios</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <div className="ion-text-center">
              <p>Descubre nuestros planes premium y mejora tu experiencia</p>
              <IonButton
                fill='outline' onClick={() => router.push('/planes')}
              >
                Ver Planes
              </IonButton>
            </div>
          </div>
        </IonAccordion>

        <IonAccordion value="bloques">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {!IsThereActiveBloques ? (
              <div className="ion-text-center">
                <p>No hay bloques activos</p>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  {IsThereActiveBloques ? 'Añadir mas bloques' : 'Añadir bloques'}
                </IonButton>
              </div>
            ) : (
              <div>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  Añadir mas bloques
                </IonButton>
                <BloquesSettingsC />
              </div>
            )}
          </div>
        </IonAccordion>
        <ArchivedBloquesSettingsC />
      </IonAccordionGroup>

      {/* modal add bloques */}
      <AddBloquesSettingsModalC
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        bloqueForm={bloqueForm}
        setBloqueForm={setBloqueForm}
        handleConfirm={handleConfirm}
        type='new'
      />
    </div>
  );
}

export default SettingsC;