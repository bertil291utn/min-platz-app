import {
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton,
} from '@ionic/react';
import {
  
  INITIAL_BLOQUE, useBloqueInfo
} from '../contexts/BloqueInfoContext';
import BloquesSettingsC from './BloquesSettingsC';
import { useEffect, useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { NUMERO_CAMAS_MIN } from '../helpers/bloquesConstant';
import ArchivedBloquesSettingsC from './ArchivedBloquesSettingsC';
import { Bloque } from '../interfaces/Bloque';


const SettingsC = () => {
  const { bloques, addBloque, activeBloques } = useBloqueInfo();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bloqueForm, setBloqueForm] = useState<Bloque>(INITIAL_BLOQUE);

  useEffect(() => {
    setBloqueForm(prev => ({
      ...prev,
      name: `Bloque ${bloques.length + 1}`,
      numCamas: NUMERO_CAMAS_MIN
    }));
  }, [isOpenModal]);

  const handleConfirm = () => {
    addBloque(bloqueForm);
    setIsOpenModal(false);
    setBloqueForm(INITIAL_BLOQUE);
  };


  const IsThereActiveBloques = activeBloques.length > 0;

  return (
    <div>

      <IonAccordionGroup>
        <IonAccordion value="bloques">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {!IsThereActiveBloques ? (
              <div className="ion-text-center">
                <p>No hay bloques activos</p>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  {IsThereActiveBloques ?'Añadir mas bloques' :'Añadir bloques'}
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