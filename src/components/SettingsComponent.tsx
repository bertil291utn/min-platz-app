import {
  IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton,
} from '@ionic/react';
import {
  Bloque,
  INITIAL_BLOQUE, useBloqueInfo
} from '../contexts/BloqueInfoContext';
import BloquesSettingsC from './BloquesSettingsC';
import { useEffect, useState } from 'react';
import AddBloquesSettingsModalC from './AddBloquesSettingsC';
import { NUMERO_CAMAS_MIN } from '../bloquesConstant';


const SettingsC = () => {
  const { bloques, addBloque } = useBloqueInfo();
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

  const IsNoBloques = bloques?.length === 0;

  return (
    <div>

      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" color="light">
            <IonLabel>Bloques</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            {IsNoBloques ? (
              <div className="ion-text-center">
                <p>No hay bloques</p>
                <IonButton onClick={() => setIsOpenModal(true)}>
                  Añadir bloques
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